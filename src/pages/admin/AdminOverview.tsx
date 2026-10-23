import { Users, BookOpen, ClipboardList, Wallet, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useCourses } from "../../context/CoursesContext";
import {
  enrollments,
  monthlyEnrollments,
  revenueByMonth,
  studentById,
} from "../../data/people";
import { categories } from "../../data/categories";
import StatCard from "../../components/ui/StatCard";
import AreaChart from "../../components/charts/AreaChart";
import DonutChart from "../../components/charts/DonutChart";
import Badge from "../../components/ui/Badge";
import ProgressBar from "../../components/ui/ProgressBar";
import { formatFaDate, enrollmentStatusLabels } from "../../lib/format";
import DemoBadge from "../../components/DemoBadge";

export default function AdminOverview() {
  const { courses } = useCourses();

  const categoryStats = categories
    .map((cat) => ({
      label: cat.name,
      value: enrollments.filter((e) => {
        const course = courses.find((c) => c.id === e.courseId);
        return course?.categoryId === cat.id;
      }).length,
    }))
    .filter((d) => d.value > 0);

  const revenue = revenueByMonth.reduce((s, m) => s + m.value, 0);

  const recent = [...enrollments]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-navy-900">نمای کلی آکادمی</h1>
          <p className="mt-1 text-sm text-slate-500">
            خلاصه وضعیت دوره‌ها، دانشجویان و ثبت‌نام‌ها
          </p>
        </div>
        <DemoBadge />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="دانشجو (ثبت‌نام فعال)" value={enrollments.filter((e) => e.status !== "cancelled").length} trend="up" trendLabel="۹" />
        <StatCard icon={BookOpen} label="دوره منتشرشده" value={courses.filter((c) => c.published).length} accent="sky" />
        <StatCard icon={ClipboardList} label="ثبت‌نام (جمع کل)" value={enrollments.length} accent="emerald" trend="up" trendLabel="۱۲" />
        <StatCard
          icon={Wallet}
          label="درآمد تخمینی (میلیون تومان)"
          value={revenue}
          accent="amber"
          trend="up"
          trendLabel="۱۵"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-black text-navy-900">روند ثبت‌نام ماهانه</h2>
              <p className="mt-1 text-xs text-slate-400">دوره ۱۲ ماه گذشته — داده نمایشی</p>
            </div>
            <Badge tone="royal">۱۲ ماه اخیر</Badge>
          </div>
          <AreaChart data={monthlyEnrollments} valueUnit=" نفر" />
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
          <h2 className="font-black text-navy-900">سهم دسته‌بندی‌ها</h2>
          <p className="mb-4 mt-1 text-xs text-slate-400">بر اساس ثبت‌نام‌های نمونه</p>
          <DonutChart data={categoryStats} />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-black text-navy-900">آخرین ثبت‌نام‌ها</h2>
          <Link to="/admin/enrollments" className="flex items-center gap-1 text-xs font-medium text-royal-600 hover:text-royal-700">
            مشاهده همه
            <ArrowLeft size={13} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-start text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-400">
                <th className="pb-3 pe-4 text-start font-medium">دانشجو</th>
                <th className="pb-3 pe-4 text-start font-medium">دوره</th>
                <th className="pb-3 pe-4 text-start font-medium">تاریخ</th>
                <th className="pb-3 pe-4 text-start font-medium">پیشرفت</th>
                <th className="pb-3 text-start font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((e) => (
                <tr key={e.id} className="border-b border-slate-50 last:border-0">
                  <td className="py-3 pe-4 font-medium text-navy-900">
                    {studentById[e.studentId]?.name ?? e.studentId}
                  </td>
                  <td className="py-3 pe-4 text-slate-600">
                    {courses.find((c) => c.id === e.courseId)?.title ?? "—"}
                  </td>
                  <td className="py-3 pe-4 text-slate-500">{formatFaDate(e.date)}</td>
                  <td className="w-36 py-3 pe-4">
                    <ProgressBar value={e.progress} showLabel={false} />
                  </td>
                  <td className="py-3">
                    <Badge
                      tone={e.status === "completed" ? "green" : e.status === "cancelled" ? "red" : "royal"}
                    >
                      {enrollmentStatusLabels[e.status]}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[10px] text-slate-300">
          * تمام آمار و ارقام مالی این پنل نمایشی است و پرداخت واقعی در دمو وجود ندارد.
        </p>
      </div>
    </div>
  );
}
