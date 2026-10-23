import { useMemo, useState } from "react";
import { Search, Trash2, Users, RotateCcw } from "lucide-react";
import { enrollments as demoEnrollments, students as demoStudents } from "../../data/people";
import { useCourses } from "../../context/CoursesContext";
import {
  formatFaDate,
  formatNumber,
  studentStatusLabels,
  enrollmentStatusLabels,
} from "../../lib/format";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { useToast } from "../../components/ui/Toast";
import { CourseThumb } from "../../components/CourseCard";
import DemoBadge from "../../components/DemoBadge";

export default function AdminStudents() {
  const { toast } = useToast();
  const { courses } = useCourses();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [enrollments, setEnrollments] = useState(demoEnrollments);
  const [unenrollTarget, setUnenrollTarget] = useState<string | null>(null);

  const rows = useMemo(() => {
    let list = demoStudents.map((student) => {
      const mine = enrollments.filter((e) => e.studentId === student.id);
      const active = mine.filter((e) => e.status === "active").length;
      const completed = mine.filter((e) => e.status === "completed").length;
      const latest = [...mine].sort((a, b) => b.date.localeCompare(a.date))[0];
      return {
        student,
        enrolled: mine.filter((e) => e.status !== "cancelled").length,
        active,
        completed,
        latest,
      };
    });
    if (search.trim()) {
      list = list.filter(
        (r) => r.student.name.includes(search.trim()) || r.student.email.includes(search.trim()),
      );
    }
    if (statusFilter) list = list.filter((r) => r.student.status === statusFilter);
    return list.sort((a, b) => b.enrolled - a.enrolled);
  }, [enrollments, search, statusFilter]);

  const confirmUnenroll = () => {
    if (!unenrollTarget) return;
    setEnrollments((prev) =>
      prev.map((e) =>
        `${e.studentId}-${e.courseId}` === unenrollTarget ? { ...e, status: "cancelled" as const } : e,
      ),
    );
    setUnenrollTarget(null);
    toast("success", "ثبت‌نام لغو شد (نمایشی، تا پایان جلسه).");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-navy-900">دانشجویان</h1>
          <p className="mt-1 text-sm text-slate-500">
            فهرست دانشجویان نمونه و وضعیت ثبت‌نام آن‌ها
          </p>
        </div>
        <DemoBadge />
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-card sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جست‌وجو بر اساس نام یا ایمیل…"
            aria-label="جست‌وجوی دانشجو"
            className="input-base ps-10 pe-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="فیلتر وضعیت"
          className="input-base w-auto sm:w-44"
        >
          <option value="">همه وضعیت‌ها</option>
          <option value="active">فعال</option>
          <option value="inactive">غیرفعال</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
        {rows.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-50 text-royal-400">
              <Users size={22} />
            </span>
            <p className="font-bold text-navy-900">دانشجویی یافت نشد</p>
            <p className="mt-1 text-sm text-slate-400">جست‌وجو یا فیلترها را تغییر بده.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead className="bg-slate-50/70 text-xs text-slate-400">
                <tr>
                  <th className="px-5 py-3.5 text-start font-medium">دانشجو</th>
                  <th className="px-3 py-3.5 text-start font-medium">تاریخ عضویت</th>
                  <th className="px-3 py-3.5 text-start font-medium">دوره فعال</th>
                  <th className="px-3 py-3.5 text-start font-medium">تکمیل‌شده</th>
                  <th className="px-3 py-3.5 text-start font-medium">آخرین دوره</th>
                  <th className="px-3 py-3.5 text-start font-medium">وضعیت</th>
                  <th className="px-5 py-3.5 text-start font-medium">اقدامات</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ student, enrolled, active, completed, latest }) => (
                  <tr key={student.id} className="border-t border-slate-50 transition-colors hover:bg-slate-50/50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-bl from-royal-500 to-navy-700 text-[10px] font-bold text-white">
                          {student.name.slice(0, 1)}
                        </span>
                        <div>
                          <p className="font-bold text-navy-900">{student.name}</p>
                          <p className="text-[11px] text-slate-400" dir="ltr">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-slate-500">{formatFaDate(student.joinDate)}</td>
                    <td className="px-3 py-3">
                      <span className="font-bold text-navy-900">{formatNumber(active)}</span>
                      <span className="ms-1 text-[10px] text-slate-400">از {formatNumber(enrolled)}</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{formatNumber(completed)}</td>
                    <td className="px-3 py-3">
                      {latest ? (
                        <div className="flex items-center gap-2">
                          <CourseThumb
                            course={courses.find((c) => c.id === latest.courseId) ?? courses[0]}
                            className="h-8 w-8 shrink-0 rounded-md"
                            iconSize={13}
                          />
                          <div>
                            <p className="max-w-40 truncate text-xs font-medium text-navy-800">
                              {courses.find((c) => c.id === latest.courseId)?.title ?? "—"}
                            </p>
                            <Badge tone={latest.status === "completed" ? "green" : latest.status === "cancelled" ? "red" : "royal"} className="mt-0.5">
                              {enrollmentStatusLabels[latest.status]}
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <Badge tone={student.status === "active" ? "green" : "slate"}>
                        {studentStatusLabels[student.status]}
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      {latest && latest.status !== "cancelled" ? (
                        <button
                          onClick={() => setUnenrollTarget(`${student.id}-${latest.courseId}`)}
                          className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          aria-label={`لغو ثبت‌نام ${student.name} در آخرین دوره`}
                          title="لغو ثبت‌نام آخرین دوره"
                        >
                          <Trash2 size={15} />
                        </button>
                      ) : (
                        <RotateCcw size={15} className="text-slate-200" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={!!unenrollTarget}
        onClose={() => setUnenrollTarget(null)}
        title="لغو ثبت‌نام"
      >
        <p className="text-sm leading-7 text-slate-600">
          آیا از لغو ثبت‌نام این دانشجو در دوره مطمئنی؟ این اقدام در داده‌های نمایشی
          این جلسه اعمال می‌شود و اطلاعات اصلی تغییر نمی‌کند.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setUnenrollTarget(null)}>انصراف</Button>
          <Button variant="danger" onClick={confirmUnenroll}>بله، لغو شود</Button>
        </div>
      </Modal>
    </div>
  );
}
