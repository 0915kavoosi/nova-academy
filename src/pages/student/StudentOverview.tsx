import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock3,
  Flame,
  Award,
  ArrowLeft,
  CalendarDays,
  Bell,
  CheckCircle2,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import { useCourses } from "../../context/CoursesContext";
import { enrollments } from "../../data/people";
import { currentStudent, weeklyActivity, upcomingClasses, notifications, studentGoals } from "../../data/studentDashboard";
import { instructorById } from "../../data/instructors";
import { formatFaDate, toFa } from "../../lib/format";
import StatCard from "../../components/ui/StatCard";
import ProgressBar from "../../components/ui/ProgressBar";
import BarChart from "../../components/charts/BarChart";
import Badge from "../../components/ui/Badge";
import DemoBadge from "../../components/DemoBadge";

const notifIcons = {
  class: CalendarDays,
  message: MessageSquare,
  award: Award,
  update: RefreshCw,
};

export default function StudentOverview() {
  const { courses } = useCourses();

  const myEnrollments = enrollments
    .filter((e) => e.studentId === currentStudent.id && e.status !== "cancelled")
    .map((e) => ({ enrollment: e, course: courses.find((c) => c.id === e.courseId) }))
    .filter((x): x is { enrollment: typeof enrollments[number]; course: NonNullable<typeof x.course> } => x.course !== undefined);

  const active = myEnrollments.filter((x) => x.enrollment.status === "active").length;
  const completed = myEnrollments.filter((x) => x.enrollment.status === "completed").length;
  const totalHours = myEnrollments.reduce(
    (s, x) => s + Math.round(x.course.durationHours * (x.enrollment.progress / 100)),
    0,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-navy-900">نمای کلی</h1>
          <p className="mt-1 text-sm text-slate-500">
            {currentStudent.name} عزیز، خوش برگشتی! خلاصه وضعیت یادگیری تو این هفته:
          </p>
        </div>
        <DemoBadge />
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={BookOpen} label="دوره در حال یادگیری" value={active} />
        <StatCard icon={Award} label="دوره تکمیل‌شده" value={completed} accent="emerald" />
        <StatCard icon={Clock3} label="ساعت یادگیری (تجمعی)" value={totalHours} suffix=" ساعت" accent="sky" />
        <StatCard icon={Flame} label="دنباله یادگیری" value={12} suffix=" روز" accent="amber" trend="up" trendLabel="۲" />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Enrolled courses */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-black text-navy-900">دوره‌های من</h2>
            <Link to="/courses" className="flex items-center gap-1 text-xs font-medium text-royal-600 hover:text-royal-700">
              افزودن دوره جدید
              <ArrowLeft size={13} />
            </Link>
          </div>
          <div className="space-y-4">
            {myEnrollments.map(({ enrollment, course }) => (
              <div
                key={enrollment.id}
                className="rounded-xl border border-slate-100 p-4 transition-colors hover:border-royal-200"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Link to={`/courses/${course.id}`} className="font-bold text-navy-900 hover:text-royal-700">
                    {course.title}
                  </Link>
                  {enrollment.status === "completed" ? (
                    <Badge tone="green">
                      <CheckCircle2 size={11} />
                      تکمیل شده
                    </Badge>
                  ) : (
                    <Badge tone="royal">در حال یادگیری</Badge>
                  )}
                </div>
                <ProgressBar
                  value={enrollment.progress}
                  color={enrollment.status === "completed" ? "green" : "royal"}
                  className="mt-3"
                />
                <p className="mt-2 text-[11px] text-slate-400">
                  {enrollment.progress === 100
                    ? "گواهی این دوره صادر شده است"
                    : `شروع دوره: ${formatFaDate(enrollment.date)}`} · مدرس: {instructorById[course.instructorId].name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly activity */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
          <h2 className="font-black text-navy-900">فعالیت یادگیری این هفته</h2>
          <p className="mb-4 mt-1 text-xs text-slate-400">مطالعه بر حسب دقیقه (داده نمایشی)</p>
          <BarChart data={weeklyActivity} axisLabel="دقیقه" />
          <div className="mt-4 border-t border-slate-100 pt-4">
            <h3 className="mb-3 text-sm font-bold text-navy-900">اهداف هفتگی</h3>
            <ul className="space-y-3">
              {studentGoals.map((g) => (
                <li key={g.id}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-slate-600">{g.label}</span>
                    <span className="font-bold text-navy-800">
                      {g.id === "g3"
                        ? `٪${toFa(g.current)} از ٪${toFa(g.total)}`
                        : `${toFa(g.current)} از ${toFa(g.total)}`}
                    </span>
                  </div>
                  <ProgressBar
                    value={g.id === "g3" ? g.current : Math.round((g.current / g.total) * 100)}
                    color="sky"
                    showLabel={false}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Upcoming classes */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card xl:col-span-2">
          <h2 className="mb-4 font-black text-navy-900">کلاس‌های پیش‌رو</h2>
          <div className="space-y-3">
            {upcomingClasses.map((k) => (
              <div
                key={k.id}
                className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-100 p-4"
              >
                <span className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-royal-50 text-royal-700">
                  <CalendarDays size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-navy-900">{k.title}</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {k.type} · مدرس: {instructorById[k.instructorId].name}
                  </p>
                </div>
                <div className="text-end">
                  <p className="text-xs font-bold text-navy-800">
                    {formatFaDate(k.date)}
                  </p>
                  <p className="text-[11px] text-slate-400">{k.time}</p>
                </div>
                <Badge tone="sky" className="w-full justify-center sm:w-auto">
                  یادآوری فعال
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-black text-navy-900">اعلان‌ها</h2>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-royal-600 px-1.5 text-[10px] font-bold text-white">
              {toFa(notifications.filter((n) => n.unread).length)}
            </span>
          </div>
          <ul className="space-y-3">
            {notifications.map((n) => {
              const Icon = notifIcons[n.type];
              return (
                <li
                  key={n.id}
                  className={`flex gap-3 rounded-xl border p-3 ${
                    n.unread ? "border-royal-100 bg-royal-50/40" : "border-slate-100"
                  }`}
                >
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${n.unread ? "bg-royal-600/10 text-royal-600" : "bg-slate-100 text-slate-400"}`}>
                    <Icon size={15} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-navy-900">{n.title}</p>
                    <p className="mt-1 text-[11px] leading-5 text-slate-500">{n.text}</p>
                    <p className="mt-1 text-[10px] text-slate-300">{n.time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-center text-[10px] text-slate-300">
            اعلان‌ها بخشی از داده‌های نمایشی هستند. <Bell size={10} className="inline" />
          </p>
        </div>
      </div>
    </div>
  );
}
