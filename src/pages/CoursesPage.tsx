import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, SearchX } from "lucide-react";
import { useCourses } from "../context/CoursesContext";
import { categories, categoryById } from "../data/categories";
import { levelLabels, formatNumber, toFa } from "../lib/format";
import CourseCard from "../components/CourseCard";
import Button from "../components/ui/Button";

const sortOptions = [
  { id: "popular", label: "محبوب‌ترین" },
  { id: "newest", label: "جدیدترین" },
  { id: "price-asc", label: "ارزان‌ترین" },
  { id: "price-desc", label: "گران‌ترین" },
  { id: "rating", label: "بالاترین امتیاز" },
];

export default function CoursesPage() {
  const { courses } = useCourses();
  const [params, setParams] = useSearchParams();

  const q = params.get("q") ?? "";
  const category = params.get("category");
  const level = params.get("level");
  const sort = params.get("sort") ?? "popular";
  const [searchInput, setSearchInput] = useState(q);
  const [loading, setLoading] = useState(true);

  useEffect(() => setSearchInput(q), [q]);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(t);
  }, []);

  const published = useMemo(() => courses.filter((c) => c.published), [courses]);

  const filtered = useMemo(() => {
    let list = [...published];
    if (q.trim()) {
      const needle = q.trim();
      list = list.filter(
        (c) =>
          c.title.includes(needle) ||
          c.shortDescription.includes(needle) ||
          categoryById[c.categoryId].name.includes(needle),
      );
    }
    if (category) list = list.filter((c) => c.categoryId === category);
    if (level) list = list.filter((c) => c.level === level);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      default:
        list.sort((a, b) => b.studentCount - a.studentCount);
    }
    return list;
  }, [published, q, category, level, sort]);

  const updateParams = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(patch)) {
      if (value === null || value === "") next.delete(key);
      else next.set(key, value);
    }
    setParams(next, { replace: true });
  };

  const hasFilters = !!(q || category || level || sort !== "popular");

  return (
    <div className="bg-slate-50 pb-16">
      {/* Page header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container-app py-10">
          <nav aria-label="مسیر صفحه" className="mb-3 text-xs text-slate-400">
            <Link to="/" className="hover:text-royal-600">خانه</Link>
            <span className="mx-1.5">/</span>
            <span className="text-slate-600">دوره‌ها</span>
          </nav>
          <h1 className="text-2xl font-black text-navy-900 sm:text-3xl">
            دوره‌های آموزشی
          </h1>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            {formatNumber(published.length)} دوره فعال در {toFa(categories.length)} دسته‌بندی — دوره‌ای مناسب سطح فعلی خودت را انتخاب کن.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-16 z-20 border-b border-slate-100 bg-slate-50/95 py-3 backdrop-blur">
        <div className="container-app">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <form
              className="relative flex-1"
              onSubmit={(e) => {
                e.preventDefault();
                updateParams({ q: searchInput });
              }}
            >
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onBlur={() => {
                  if (searchInput !== q) updateParams({ q: searchInput });
                }}
                placeholder="جست‌وجو بر اساس عنوان یا دسته…"
                aria-label="جست‌وجوی دوره‌ها"
                className="input-base ps-10 pe-10"
              />
              {searchInput && (
                <button
                  type="button"
                  aria-label="پاک کردن جست‌وجو"
                  className="absolute left-3 top-1/2 cursor-pointer -translate-y-1/2 text-slate-300 hover:text-slate-500"
                  onClick={() => {
                    setSearchInput("");
                    updateParams({ q: null });
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </form>

            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-slate-400 sm:block"><SlidersHorizontal size={14} className="inline" /> مرتب‌سازی:</span>
              <select
                value={sort}
                onChange={(e) => updateParams({ sort: e.target.value })}
                aria-label="مرتب‌سازی"
                className="input-base w-auto flex-1"
              >
                {sortOptions.map((o) => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
              <select
                value={level ?? ""}
                onChange={(e) => updateParams({ level: e.target.value || null })}
                aria-label="فیلتر سطح"
                className="input-base w-auto flex-1"
              >
                <option value="">همه سطوح</option>
                {Object.entries(levelLabels).map(([id, label]) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category pills */}
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => updateParams({ category: null })}
              aria-pressed={!category}
              className={`shrink-0 cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                !category ? "bg-navy-900 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-navy-900"
              }`}
            >
              همه دسته‌ها
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => updateParams({ category: category === cat.id ? null : cat.id })}
                aria-pressed={category === cat.id}
                className={`shrink-0 cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  category === cat.id
                    ? "bg-navy-900 text-white"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-navy-900"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container-app pt-8">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {formatNumber(filtered.length)} دوره
            {q && <span> برای «{q}»</span>}
            منظور شد
          </p>
          {hasFilters && (
            <button
              onClick={() => {
                setSearchInput("");
                setParams({}, { replace: true });
              }}
              className="flex cursor-pointer items-center gap-1 text-xs font-medium text-royal-600 hover:text-royal-700"
            >
              <X size={13} />
              حذف فیلترها
            </button>
          )}
        </div>

        {loading ? (
          <div aria-busy="true" aria-label="در حال بارگذاری دوره‌ها">
            <div className="h-4 w-40 skeleton mb-6" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
                  <div className="h-40 skeleton rounded-none" />
                  <div className="space-y-3 p-5">
                    <div className="h-4 w-20 skeleton" />
                    <div className="h-5 w-full skeleton" />
                    <div className="h-4 w-2/3 skeleton" />
                    <div className="h-4 w-1/2 skeleton" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center shadow-card">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-50 text-royal-400">
              <SearchX size={26} />
            </span>
            <h2 className="font-bold text-navy-900">دوره‌ای یافت نشد</h2>
            <p className="mt-2 max-w-sm text-sm leading-7 text-slate-500">
              در حال حاضر دوره‌ای مطابق جست‌وجو یا فیلترهای شما وجود ندارد. عبارت دیگری را امتحان کن یا فیلترها را پاک کن.
            </p>
            <Button
              variant="outline"
              className="mt-5"
              onClick={() => {
                setSearchInput("");
                setParams({}, { replace: true });
              }}
            >
              نمایش همه دوره‌ها
            </Button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
