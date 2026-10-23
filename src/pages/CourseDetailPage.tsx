import { useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Clock,
  BookOpen,
  Users,
  PlayCircle,
  ChevronDown,
  Check,
  Info,
  GraduationCap,
} from "lucide-react";
import { useCourses } from "../context/CoursesContext";
import { instructorById } from "../data/instructors";
import { categoryById } from "../data/categories";
import {
  levelLabels,
  formatPrice,
  formatNumber,
  formatFaDate,
  toFa,
} from "../lib/format";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import StarRating from "../components/ui/StarRating";
import { useToast } from "../components/ui/Toast";
import { CourseThumb } from "../components/CourseCard";
import CourseCard from "../components/CourseCard";
import AppIcon from "../components/ui/AppIcon";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses } = useCourses();
  const { toast } = useToast();
  const [openSections, setOpenSections] = useState<string[]>([]);

  const course = courses.find(
    (c) => c.id === courseId && c.published,
  );

  const related = useMemo(() => {
    if (!course) return [];
    return courses
      .filter((c) => c.published && c.id !== course.id && c.categoryId === course.categoryId)
      .slice(0, 3);
  }, [courses, course]);

  if (!course) {
    return (
      <div className="container-app flex flex-col items-center py-24 text-center">
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-50 text-royal-400">
          <BookOpen size={26} />
        </span>
        <h1 className="text-xl font-black text-navy-900">دوره پیدا نشد</h1>
        <p className="mt-2 text-sm text-slate-500">
          ممکن است این دوره حذف شده یا آدرس اشتباه وارد شده باشد.
        </p>
        <Button className="mt-6" onClick={() => navigate("/courses")}>
          بازگشت به لیست دوره‌ها
        </Button>
      </div>
    );
  }

  const instructor = instructorById[course.instructorId];
  const category = categoryById[course.categoryId];
  const totalLessons = course.syllabus.reduce(
    (s, sec) => s + sec.lessons.length,
    0,
  );
  const firstLesson = course.syllabus[0]?.lessons.find((l) => l.free);

  const toggleSection = (title: string) =>
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );

  const handleEnroll = () => {
    toast(
      "info",
      "این نسخه نمایشی است: ثبت‌نام و پرداخت واقعی پیاده‌سازی نشده و برای آشنایی با ظاهر محصول ساخته شده است.",
    );
  };

  return (
    <div className="bg-slate-50 pb-16">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container-app flex flex-wrap items-center gap-1.5 py-6 text-xs text-slate-400">
          <Link to="/" className="hover:text-royal-600">خانه</Link>
          <ChevronLeft size={13} />
          <Link to="/courses" className="hover:text-royal-600">دوره‌ها</Link>
          <ChevronLeft size={13} />
          <span className="text-slate-600">{category.name}</span>
        </div>
      </div>

      {/* Header */}
      <div className="container-app -mt-6 pt-6">
        <div className="grid gap-8 pb-10 lg:grid-cols-[1fr_320px]">
          <div>
            <CourseThumb course={course} className="mb-6 h-52 w-full rounded-2xl sm:h-64" />
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="royal">
                <AppIcon name={category.icon} size={12} />
                {category.name}
              </Badge>
              <Badge tone={course.level === "advanced" ? "amber" : course.level === "intermediate" ? "sky" : "green"}>
                {levelLabels[course.level]}
              </Badge>
            </div>

            <h1 className="mt-3 text-2xl font-black leading-relaxed text-navy-900 sm:text-3xl">
              {course.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
              {course.shortDescription}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <StarRating rating={course.rating} size={15} />
                <span className="text-xs">
                  ({formatNumber(course.studentCount)} دانشجو)
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-royal-500" />
                {toFa(course.durationHours)} ساعت
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen size={15} className="text-royal-500" />
                {toFa(course.lessonCount)} درس
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={15} className="text-royal-500" />
                {levelLabels[course.level]}
              </span>
              <span className="text-xs text-slate-400">
                تاریخ انتشار: {formatFaDate(course.createdAt)}
              </span>
            </div>
          </div>

          {/* Enrollment card */}
          <aside className="lg:-mt-20">
            <div className="sticky top-24 rounded-2xl border border-slate-100 bg-white p-6 shadow-card-hover">
              <p className="text-xs text-slate-400">هزینه ثبت‌نام در دوره</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-black text-navy-900">
                  {formatPrice(course.price)}
                </span>
                {course.oldPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(course.oldPrice)}
                  </span>
                )}
              </div>

              <ul className="mt-5 space-y-2.5 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-500" />
                  دسترسی دائمی به ویدیوها
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-500" />
                  {toFa(totalLessons)} درس در {toFa(course.syllabus.length)} بخش
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-500" />
                  پرسش و پاسخ با مدرس دوره
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-500" />
                  گواهی پایان دوره
                </li>
              </ul>

              <Button size="lg" className="mt-6 w-full" onClick={handleEnroll}>
                <GraduationCap size={18} />
                ثبت‌نام در دوره
              </Button>
              {firstLesson && (
                <Button
                  variant="outline"
                  size="md"
                  className="mt-2.5 w-full"
                  onClick={() =>
                    toast("info", `پیش‌نمایش درس «${firstLesson.title}» — نسخه نمایشی`)
                  }
                >
                  <PlayCircle size={17} />
                  پیش‌نمایش رایگان درس اول
                </Button>
              )}
              <p className="mt-4 flex items-start gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-[11px] leading-5 text-amber-700">
                <Info size={13} className="mt-0.5 shrink-0" />
                نسخه نمایشی: پرداخت و ثبت‌نام واقعی در این دمو پیاده‌سازی نشده است.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Description + syllabus */}
      <div className="container-app grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="order-2 space-y-8 lg:order-1 lg:col-span-1">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:p-7">
            <h2 className="text-lg font-black text-navy-900">درباره این دوره</h2>
            <p className="mt-3 text-sm leading-8 text-slate-600">
              {course.description}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-navy-900">سرفصل‌های دوره</h2>
              <span className="text-xs text-slate-400">
                {toFa(totalLessons)} درس · {toFa(course.durationHours)} ساعت
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {course.syllabus.map((section, si) => {
                const open = openSections.includes(section.title) || si === 0;
                return (
                  <div
                    key={section.title}
                    className="overflow-hidden rounded-xl border border-slate-100"
                  >
                    <button
                      className="flex w-full cursor-pointer items-center justify-between gap-3 bg-slate-50/60 px-4 py-3.5 text-start"
                      onClick={() => toggleSection(section.title)}
                      aria-expanded={open}
                    >
                      <span className="text-sm font-bold text-navy-900">
                        بخش {toFa(si + 1)}: {section.title}
                      </span>
                      <span className="flex items-center gap-2 text-[11px] text-slate-400">
                        {toFa(section.lessons.length)} درس
                        <ChevronDown
                          size={16}
                          className={`shrink-0 text-royal-500 transition-transform ${open ? "rotate-180" : ""}`}
                        />
                      </span>
                    </button>
                    {open && (
                      <ul className="divide-y divide-slate-100 border-t border-slate-100">
                        {section.lessons.map((lesson) => (
                          <li
                            key={lesson.title}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600"
                          >
                            <PlayCircle
                              size={16}
                              className={lesson.free ? "text-emerald-500" : "text-slate-300"}
                            />
                            <span className="min-w-0 flex-1">{lesson.title}</span>
                            {lesson.free && (
                              <Badge tone="green">رایگان</Badge>
                            )}
                            <span className="text-[11px] text-slate-400" dir="ltr">
                              {lesson.duration}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Instructor */}
        <div className="order-1 lg:order-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
            <h2 className="text-base font-black text-navy-900">مدرس دوره</h2>
            <div className="mt-4 flex items-center gap-3">
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-bl text-base font-black text-white ${instructor.gradient}`}
              >
                {instructor.initials}
              </span>
              <div>
                <p className="font-bold text-navy-900">{instructor.name}</p>
                <p className="mt-0.5 text-xs text-slate-400">{instructor.title}</p>
                <StarRating rating={instructor.rating} />
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{instructor.bio}</p>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-center">
              <div>
                <p className="text-sm font-black text-navy-900">
                  {formatNumber(instructor.studentsCount)}
                </p>
                <p className="text-[10px] text-slate-400">دانشجو</p>
              </div>
              <div>
                <p className="text-sm font-black text-navy-900">
                  {toFa(instructor.coursesCount)}
                </p>
                <p className="text-[10px] text-slate-400">دوره</p>
              </div>
              <div>
                <p className="text-sm font-black text-navy-900">
                  {toFa(instructor.rating.toFixed(1))}
                </p>
                <p className="text-[10px] text-slate-400">امتیاز</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="container-app mt-14">
          <h2 className="mb-5 text-lg font-black text-navy-900">
            دوره‌های مرتبط در "<span>{category.name}</span>"
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
