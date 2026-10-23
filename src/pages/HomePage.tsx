import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Monitor,
  Users,
  Clock,
  Shield,
  MessageSquare,
  Award,
  ChevronDown,
  GraduationCap,
  Sparkles,
  BookOpen,
  LayoutDashboard,
} from "lucide-react";
import { useCourses } from "../context/CoursesContext";
import {
  categories,
} from "../data/categories";
import { instructors } from "../data/instructors";
import { heroStats, benefits, testimonials, faqs } from "../data/site";
import { formatNumber, toFa } from "../lib/format";
import CourseCard, { CourseThumb } from "../components/CourseCard";
import AppIcon from "../components/ui/AppIcon";
import StarRating from "../components/ui/StarRating";
import Button from "../components/ui/Button";
import SectionHeading from "../components/SectionHeading";

const icons = [Monitor, Users, Clock, Shield, MessageSquare, Award];

export default function HomePage() {
  const { courses } = useCourses();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0].id);

  const published = courses.filter((c) => c.published);
  const popular = [...published].sort((a, b) => b.studentCount - a.studentCount).slice(0, 6);

  const categoryCounts = Object.fromEntries(
    categories.map((cat) => [cat.id, published.filter((c) => c.categoryId === cat.id).length]),
  );

  const onSearch = () => {
    navigate(query.trim() ? `/courses?q=${encodeURIComponent(query.trim())}` : "/courses");
  };

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-navy-950">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(79,86,235,0.35), transparent), radial-gradient(ellipse 40% 40% at 10% 100%, rgba(129,152,250,0.18), transparent)",
          }}
          aria-hidden="true"
        />
        <div className="container-app relative">
          <div className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
            <div className="max-w-xl">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-navy-100">
                <Sparkles size={13} className="text-royal-300" />
                پلتفرم آموزش آنلاین حرفه‌ای
              </span>

              <h1 className="text-3xl font-black leading-[1.35] text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.35]">
                مسیر یادگیری حرفه‌ای خودت رو بساز
              </h1>

              <p className="mt-4 text-base leading-8 text-navy-200 sm:text-lg">
                با دوره‌های کاربردی، مهارت‌های جدید یاد بگیر و قدم بعدی مسیر
                شغلی‌ات رو محکم‌تر بردار.
              </p>

              <form
                className="mt-8 flex max-w-md items-center gap-2 rounded-xl bg-white p-1.5 shadow-card-hover"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSearch();
                }}
              >
                <Search size={18} className="ms-2 shrink-0 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="مثلاً React، سئو یا Figma…"
                  aria-label="جست‌وجوی دوره‌ها"
                  className="min-w-0 flex-1 bg-transparent text-sm text-navy-900 outline-none placeholder:text-slate-400"
                />
                <Button size="md" type="submit" className="rounded-lg">
                  جست‌وجو
                </Button>
              </form>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link to="/courses">
                  <Button variant="white" size="lg">
                    <BookOpen size={18} />
                    مشاهده دوره‌ها
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="border border-white/15 bg-transparent text-white hover:bg-white/10"
                  >
                    <LayoutDashboard size={18} />
                    داشبورد دانشجو
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero side preview cards */}
            <div className="relative hidden lg:block" aria-hidden="true">
              <div className="relative mx-auto max-w-md space-y-4">
                {popular.slice(0, 3).map((course, i) => (
                  <div
                    key={course.id}
                    className={`flex items-center gap-4 rounded-2xl border border-white/10 bg-navy-900/80 p-4 backdrop-blur ${
                      i === 1 ? "ms-10" : i === 2 ? "me-10" : ""
                    }`}
                  >
                    <CourseThumb course={course} className="h-14 w-14 shrink-0 rounded-xl" iconSize={22} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-white">{course.title}</p>
                      <p className="mt-1 flex items-center gap-3 text-[11px] text-navy-300">
                        <span>{toFa(course.durationHours)} ساعت</span>
                        <span>{formatNumber(course.studentCount)} دانشجو</span>
                      </p>
                    </div>
                    <ArrowLeft size={16} className="ms-auto shrink-0 text-royal-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip (demo data) */}
        <div className="relative border-t border-white/10 bg-navy-900/60">
          <div className="container-app grid grid-cols-2 gap-6 py-6 sm:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.id} className="text-center">
                <p className="text-xl font-black text-white sm:text-2xl">
                  {formatNumber(s.value)}
                  {s.suffix}
                </p>
                <p className="mt-1 text-xs text-navy-300">{s.label}</p>
                <p className="text-[9px] text-navy-500">(داده نمایشی)</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Benefits ===== */}
      <SectionHeading
        kicker="چرا آکادمی نُوا؟"
        title="مزیت‌های یادگیری با آکادمی نُوا"
        text="تجربه‌ای ساختاریافته و حرفه‌ای برای یادگیری — از شروع تا پایان دوره."
      />
      <section className="container-app -mt-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => {
            const Icon = icons[benefits.indexOf(b)];
            return (
              <div
                key={b.id}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-royal-50 text-royal-600">
                  <Icon size={20} />
                </span>
                <h3 className="mb-1.5 font-bold text-navy-900">{b.title}</h3>
                <p className="text-sm leading-7 text-slate-500">{b.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== Popular courses ===== */}
      <SectionHeading
        kicker="دوره‌های پرطرفدار"
        title="محبوب‌ترین دوره‌های آکادمی"
        text="انتخاب رای کاربران آکادمی در این ماه — بر اساس داده نمایشی"
      />
      <section className="container-app -mt-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.slice(0, 6).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/courses">
            <Button variant="outline" size="lg">
              مشاهده همه دوره‌ها
              <ArrowLeft size={17} />
            </Button>
          </Link>
        </div>
      </section>

      {/* ===== Categories ===== */}
      <SectionHeading
        kicker="دسته‌بندی‌ها"
        title="دنبال چه مهارتی هستی؟"
        text="در هر دسته، مسیر یادگیری هدفمند با دوره‌های مرتبط را دنبال کن."
      />
      <section className="container-app -mt-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/courses?category=${encodeURIComponent(cat.name)}`}
              className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-royal-300">
                <AppIcon name={cat.icon} size={22} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-navy-900 transition-colors group-hover:text-royal-700">
                  {cat.name}
                </span>
                <span className="mt-0.5 block text-xs text-slate-400">
                  {formatNumber(categoryCounts[cat.id])} دوره فعال
                </span>
              </span>
              <ArrowLeft size={16} className="shrink-0 text-slate-300 transition-colors group-hover:text-royal-500" />
            </Link>
          ))}
        </div>
      </section>

      {/* ===== Instructors ===== */}
      <SectionHeading
        kicker="مدرس‌های آکادمی"
        title="با مدرس‌های ما آشنا شو"
        text="مدرس‌هایی که تجربه واقعی صنعت را همزمان با آموزش به اشتراک می‌گذارند."
      />
      <section className="container-app -mt-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((inst) => (
            <div
              key={inst.id}
              className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-card transition-shadow hover:shadow-card-hover"
            >
              <span
                className={`mb-1 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-bl text-lg font-black text-white ${inst.gradient}`}
              >
                {inst.initials}
              </span>
              <StarRating rating={inst.rating} />
              <h3 className="mt-2 font-bold text-navy-900">{inst.name}</h3>
              <p className="mt-0.5 text-xs text-slate-400">{inst.title}</p>
              <p className="mt-3 flex-1 text-xs leading-6 text-slate-500">{inst.bio}</p>
              <div className="mt-4 flex w-full items-center justify-center gap-5 border-t border-slate-100 pt-4 text-xs text-slate-500">
                <span>{formatNumber(inst.studentsCount)} دانشجو</span>
                <span>{toFa(inst.coursesCount)} دوره</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <SectionHeading
        kicker="نظر دانشجویان"
        title="تجربه‌های یادگیری در نُوا"
        text="نمونه‌ای از بازخورد دانشجویان — این مطالب نمونه و نمایشی هستند."
      />
      <section className="container-app -mt-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-card"
            >
              <StarRating rating={t.rating} />
              <blockquote className="my-3 flex-1 text-sm leading-7 text-slate-600">
                «{t.text}»
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-bl text-[10px] font-bold text-white ${t.gradient}`}
                >
                  {t.initials}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold text-navy-900">{t.name}</span>
                  <span className="block text-[11px] text-slate-400">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-slate-400">
          * نظرات، آمار و شماره‌های ارائه‌شده در سایت همگی محتوای نمونه (Sample) هستند.
        </p>
      </section>

      {/* ===== FAQ ===== */}
      <SectionHeading
        kicker="سؤالات متداول"
        title="پاسخ سؤال‌های پرتکرار"
        text="اگر پاسخ سؤالت را پیدا نکردی، از طریق فرم تماس با ما در میان بگذار."
      />
      <section id="faq" className="container-app -mt-6 scroll-mt-24">
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((f) => {
            const open = openFaq === f.id;
            return (
              <div
                key={f.id}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card"
              >
                <button
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-start"
                  onClick={() => setOpenFaq(open ? null : f.id)}
                  aria-expanded={open}
                  aria-controls={`faq-${f.id}`}
                >
                  <span className="font-bold text-navy-900">{f.question}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-royal-500 transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {open && (
                  <div
                    id={`faq-${f.id}`}
                    className="border-t border-slate-100 px-5 py-4 text-sm leading-7 text-slate-600"
                  >
                    {f.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="container-app mt-20">
        <div className="relative overflow-hidden rounded-3xl bg-navy-950 px-6 py-12 text-center sm:px-12 lg:py-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(79,86,235,0.35), transparent)",
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl">
            <GraduationCap size={36} className="mx-auto mb-4 text-royal-300" />
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              اولین قدم رو همین امروز بردار
            </h2>
            <p className="mt-3 text-sm leading-7 text-navy-200 sm:text-base">
              از دوره‌های تخصصی آکادمی نُوا دیدن کن و مسیر حرفه‌ای خودت رو شروع کن.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/courses">
                <Button size="lg">
                  شروع یادگیری
                  <ArrowLeft size={17} />
                </Button>
              </Link>
              <a href="#faq">
                <Button size="lg" variant="outline" className="border-white/25 bg-transparent text-white hover:border-white/50 hover:text-white">
                  سؤالات متداول
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
