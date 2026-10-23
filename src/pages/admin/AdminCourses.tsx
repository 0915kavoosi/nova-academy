import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import type { Course } from "../../types";
import { useCourses } from "../../context/CoursesContext";
import { instructors } from "../../data/instructors";
import { categories, categoryById } from "../../data/categories";
import { levelLabels, formatPrice, formatNumber, toFa } from "../../lib/format";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import { TextField, SelectField, TextareaField } from "../../components/ui/FormFields";
import { useToast } from "../../components/ui/Toast";
import StarRating from "../../components/ui/StarRating";
import { CourseThumb } from "../../components/CourseCard";

const emptyForm = {
  title: "",
  instructorId: instructors[0].id,
  categoryId: categories[0].id,
  level: "beginner",
  price: "",
  oldPrice: "",
  durationHours: "",
  lessonCount: "",
  studentCount: "",
  rating: "5",
  shortDescription: "",
  description: "",
  gradient: "from-royal-500 to-navy-800",
  icon: "code",
};

type FormState = typeof emptyForm;

const gradientOptions = [
  "from-royal-500 to-navy-800",
  "from-sky-500 to-navy-700",
  "from-indigo-500 to-royal-800",
  "from-blue-500 to-navy-900",
  "from-navy-600 to-royal-900",
  "from-royal-400 to-blue-700",
];
const iconOptions = ["code", "globe", "palette", "megaphone", "search", "chart", "atom", "server"];

export default function AdminCourses() {
  const { courses, addCourse, updateCourse, deleteCourse, resetCourses, isModified } = useCourses();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null);

  const filtered = useMemo(() => {
    let list = [...courses];
    if (search.trim()) list = list.filter((c) => c.title.includes(search.trim()));
    if (categoryFilter) list = list.filter((c) => c.categoryId === categoryFilter);
    if (statusFilter) list = list.filter((c) => (statusFilter === "published" ? c.published : !c.published));
    return list;
  }, [courses, search, categoryFilter, statusFilter]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormErrors({});
    setModalOpen(true);
  };

  const openEdit = (course: Course) => {
    setEditingId(course.id);
    setForm({
      title: course.title,
      instructorId: course.instructorId,
      categoryId: course.categoryId,
      level: course.level,
      price: String(course.price),
      oldPrice: course.oldPrice ? String(course.oldPrice) : "",
      durationHours: String(course.durationHours),
      lessonCount: String(course.lessonCount),
      studentCount: String(course.studentCount),
      rating: String(course.rating),
      shortDescription: course.shortDescription,
      description: course.description,
      gradient: course.gradient,
      icon: course.icon,
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (form.title.trim().length < 5) errs.title = "عنوان باید حداقل ۵ نویسه باشد";
    if (form.price === "" || Number(form.price) < 0 || Number.isNaN(Number(form.price)))
      errs.price = "قیمت معتبر وارد کن (یا ۰ برای رایگان)";
    if (form.durationHours === "" || Number(form.durationHours) <= 0) errs.durationHours = "ساعت دوره را وارد کن";
    if (form.lessonCount === "" || Number(form.lessonCount) <= 0) errs.lessonCount = "تعداد درس‌ها را وارد کن";
    if (form.shortDescription.trim().length < 10) errs.shortDescription = "توضیح کوتاه باید حداقل ۱۰ نویسه باشد";
    const rating = Number(form.rating);
    if (!rating || rating < 1 || rating > 5) errs.rating = "امتیاز بین ۱ تا ۵";
    const students = Number(form.studentCount);
    if (!Number.isInteger(students) || students < 0) errs.studentCount = "عدد صحیح و نامنفی وارد کن";
    if (Object.keys(errs).length) {
      setFormErrors(errs);
      toast("error", "فرم دارای خطاست؛ فیلدها را بررسی کن.");
      return false;
    }
    return true;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: Omit<Course, "id" | "createdAt" | "syllabus" | "published"> = {
      title: form.title.trim(),
      instructorId: form.instructorId,
      categoryId: form.categoryId,
      level: form.level as Course["level"],
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      durationHours: Number(form.durationHours),
      lessonCount: Number(form.lessonCount),
      studentCount: Number(form.studentCount || 0),
      rating: Number(form.rating),
      gradient: form.gradient,
      icon: form.icon,
      shortDescription: form.shortDescription.trim(),
      description: form.description.trim() || form.shortDescription.trim(),
    };

    if (editingId) {
      updateCourse(editingId, payload);
      toast("success", "نمایشی: تغییرات دوره با موفقیت ذخیره شد.");
    } else {
      addCourse({
        ...payload,
        id: `c-${Date.now().toString(36)}`,
        createdAt: new Date().toISOString().slice(0, 10),
        syllabus: [],
        published: false,
      });
      toast("success", "نمایشی: دوره جدید به‌عنوان پیش‌نویس ایجاد شد.");
    }
    setModalOpen(false);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteCourse(deleteTarget.id);
    setDeleteTarget(null);
    toast("success", `دوره «${deleteTarget.title}» حذف شد.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-navy-900">مدیریت دوره‌ها</h1>
          <p className="mt-1 text-sm text-slate-500">
            افزودن، ویرایش و حذف دوره‌ها — تغییرات در مرورگر شما ذخیره می‌شود
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isModified && (
            <Button variant="ghost" size="sm" onClick={resetCourses}>
              <RotateCcw size={14} />
              بازنشانی داده نمایشی
            </Button>
          )}
          <Button size="sm" onClick={openAdd}>
            <Plus size={15} />
            افزودن دوره
          </Button>
        </div>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-card sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جست‌وجو بر اساس عنوان دوره…"
            aria-label="جست‌وجوی دوره"
            className="input-base ps-10 pe-10"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="فیلتر دسته‌بندی"
          className="input-base w-auto sm:w-52"
        >
          <option value="">همه دسته‌بندی‌ها</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="فیلتر وضعیت انتشار"
          className="input-base w-auto sm:w-44"
        >
          <option value="">همه وضعیت‌ها</option>
          <option value="published">منتشرشده</option>
          <option value="draft">پیش‌نویس</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-50 text-royal-400">
              <BookOpen size={22} />
            </span>
            <p className="font-bold text-navy-900">دوره‌ای یافت نشد</p>
            <p className="mt-1 text-sm text-slate-400">
              جست‌وجو یا فیلترها را تغییر بده یا دوره جدیدی اضافه کن.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead className="bg-slate-50/70 text-xs text-slate-400">
                <tr>
                  <th className="px-5 py-3.5 text-start font-medium">دوره</th>
                  <th className="px-3 py-3.5 text-start font-medium">دسته‌بندی</th>
                  <th className="px-3 py-3.5 text-start font-medium">مدرس</th>
                  <th className="px-3 py-3.5 text-start font-medium">قیمت</th>
                  <th className="px-3 py-3.5 text-start font-medium">دانشجو</th>
                  <th className="px-3 py-3.5 text-start font-medium">وضعیت</th>
                  <th className="px-5 py-3.5 text-start font-medium">اقدامات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((course) => {
                  const instructor = instructors.find((i) => i.id === course.instructorId);
                  return (
                    <tr key={course.id} className="border-t border-slate-50 transition-colors hover:bg-slate-50/50">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <CourseThumb course={course} className="h-10 w-10 shrink-0 rounded-lg" iconSize={16} />
                          <div className="min-w-0">
                            <p className="max-w-52 truncate font-bold text-navy-900">{course.title}</p>
                            <p className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-400">
                              <StarRating rating={course.rating} size={11} />
                              <span>{toFa(course.durationHours)} ساعت</span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <Badge tone="royal">{categoryById[course.categoryId].name}</Badge>
                      </td>
                      <td className="px-3 py-3 text-slate-600">{instructor?.name ?? "—"}</td>
                      <td className="px-3 py-3 font-medium text-navy-900">{formatPrice(course.price)}</td>
                      <td className="px-3 py-3 text-slate-600">{formatNumber(course.studentCount)}</td>
                      <td className="px-3 py-3">
                        {course.published ? (
                          <Badge tone="green">منتشرشده</Badge>
                        ) : (
                          <Badge tone="amber">پیش‌نویس</Badge>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => openEdit(course)}
                            aria-label={`ویرایش ${course.title}`}
                            title="ویرایش"
                            className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-royal-50 hover:text-royal-600"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() =>
                              updateCourse(course.id, { published: !course.published })
                            }
                            aria-label={course.published ? "لغو انتشار" : "انتشار"}
                            title={course.published ? "لغو انتشار" : "انتشار"}
                            className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(course)}
                            aria-label={`حذف ${course.title}`}
                            title="حذف"
                            className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "ویرایش دوره" : "افزودن دوره جدید"}
        size="lg"
      >
        <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <TextField
              label="عنوان دوره"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              error={formErrors.title}
              required
            />
          </div>
          <SelectField
            label="دسته‌بندی"
            value={form.categoryId}
            onChange={(e) => setForm((p) => ({ ...p, categoryId: e.target.value }))}
            required
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </SelectField>
          <SelectField
            label="مدرس"
            value={form.instructorId}
            onChange={(e) => setForm((p) => ({ ...p, instructorId: e.target.value }))}
            required
          >
            {instructors.map((i) => (
              <option key={i.id} value={i.id}>{i.name}</option>
            ))}
          </SelectField>
          <SelectField
            label="سطح"
            value={form.level}
            onChange={(e) => setForm((p) => ({ ...p, level: e.target.value }))}
          >
            {Object.entries(levelLabels).map(([id, label]) => (
              <option key={id} value={id}>{label}</option>
            ))}
          </SelectField>
          <TextField
            label="امتیاز (۱ تا ۵)"
            type="number"
            dir="ltr"
            min={1}
            max={5}
            step="0.1"
            value={form.rating}
            onChange={(e) => setForm((p) => ({ ...p, rating: e.target.value }))}
            error={formErrors.rating}
            required
          />
          <TextField
            label="قیمت (تومان) — ۰ برای رایگان"
            type="number"
            dir="ltr"
            min={0}
            step="10000"
            value={form.price}
            onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
            error={formErrors.price}
            required
          />
          <TextField
            label="قیمت قبل از تخفیف (اختیاری)"
            type="number"
            dir="ltr"
            min={0}
            step="10000"
            value={form.oldPrice}
            onChange={(e) => setForm((p) => ({ ...p, oldPrice: e.target.value }))}
          />
          <TextField
            label="مدت دوره (ساعت)"
            type="number"
            dir="ltr"
            min={1}
            value={form.durationHours}
            onChange={(e) => setForm((p) => ({ ...p, durationHours: e.target.value }))}
            error={formErrors.durationHours}
            required
          />
          <TextField
            label="تعداد درس‌ها"
            type="number"
            dir="ltr"
            min={1}
            value={form.lessonCount}
            onChange={(e) => setForm((p) => ({ ...p, lessonCount: e.target.value }))}
            error={formErrors.lessonCount}
            required
          />
          <TextField
            label="تعداد دانشجویان"
            type="number"
            dir="ltr"
            min={0}
            value={form.studentCount}
            onChange={(e) => setForm((p) => ({ ...p, studentCount: e.target.value }))}
            error={formErrors.studentCount}
          />
          <div className="sm:col-span-2">
            <TextField
              label="توضیح کوتاه"
              value={form.shortDescription}
              onChange={(e) => setForm((p) => ({ ...p, shortDescription: e.target.value }))}
              error={formErrors.shortDescription}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <TextareaField
              label="توضیحات کامل (اختیاری)"
              rows={3}
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            />
          </div>

          <SelectField
            label="رنگ تصویر دوره"
            value={form.gradient}
            onChange={(e) => setForm((p) => ({ ...p, gradient: e.target.value }))}
          >
            {gradientOptions.map((g) => (
              <option key={g} value={g}>
                {g === gradientOptions[0] && "آبی سلطنتی"}
                {g === gradientOptions[1] && "آسمانی"}
                {g === gradientOptions[2] && "نیلی"}
                {g === gradientOptions[3] && "آبی عمیق"}
                {g === gradientOptions[4] && "نیمه‌شب"}
                {g === gradientOptions[5] && "آبی روشن"}
              </option>
            ))}
          </SelectField>
          <SelectField
            label="آیکون دوره"
            value={form.icon}
            onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
          >
            {iconOptions.map((icon) => (
              <option key={icon} value={icon}>
                {icon === "code" && "کد"}
                {icon === "globe" && "وب"}
                {icon === "palette" && "طراحی"}
                {icon === "megaphone" && "مارکتینگ"}
                {icon === "search" && "جست‌وجو"}
                {icon === "chart" && "نمودار"}
                {icon === "atom" && "ری‌اکت / نماد اتم"}
                {icon === "server" && "سرور"}
              </option>
            ))}
          </SelectField>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 sm:col-span-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
              انصراف
            </Button>
            <Button type="submit">
              {editingId ? "ذخیره تغییرات" : "ایجاد دوره (پیش‌نویس)"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete confirmation */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="حذف دوره">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
            <Trash2 size={18} />
          </span>
          <div>
            <p className="text-sm font-bold text-navy-900">
              از حذف «{deleteTarget?.title}» مطمئنی؟
            </p>
            <p className="mt-2 text-xs leading-6 text-slate-500">
              این اقدام قابل بازگشت نیست و دوره از لیست دوره‌ها حذف می‌شود. برای بازیابی داده‌های اولیه می‌توانی از دکمه «بازنشانی داده نمایشی» استفاده کنی.
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
            انصراف
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            بله، حذف شود
          </Button>
        </div>
      </Modal>
    </div>
  );
}
