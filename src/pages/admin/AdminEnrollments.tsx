import { useMemo, useState } from "react";
import { Search, ClipboardList, Plus, Trash2, Undo2, Save, X } from "lucide-react";
import type { Enrollment } from "../../types";
import {
  enrollments as demoEnrollments,
  students as demoStudents,
} from "../../data/people";
import { useCourses } from "../../context/CoursesContext";
import { instructorById } from "../../data/instructors";
import { formatFaDate, toFa, enrollmentStatusLabels } from "../../lib/format";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { TextField, SelectField } from "../../components/ui/FormFields";
import { useToast } from "../../components/ui/Toast";
import ProgressBar from "../../components/ui/ProgressBar";
import DemoBadge from "../../components/DemoBadge";

export default function AdminEnrollments() {
  const { toast } = useToast();
  const { courses } = useCourses();

  const [list, setList] = useState<Enrollment[]>(demoEnrollments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ studentId: demoStudents[0].id, courseId: courses[0].id, progress: "0" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<Enrollment | null>(null);

  const rows = useMemo(() => {
    let data = [...list].sort((a, b) => b.date.localeCompare(a.date));
    if (search.trim()) {
      const needle = search.trim();
      data = data.filter(
        (e) =>
          (demoStudents.find((s) => s.id === e.studentId)?.name ?? "").includes(needle) ||
          (courses.find((c) => c.id === e.courseId)?.title ?? "").includes(needle),
      );
    }
    if (statusFilter) data = data.filter((e) => e.status === statusFilter);
    if (courseFilter) data = data.filter((e) => e.courseId === courseFilter);
    return data;
  }, [list, search, statusFilter, courseFilter, courses]);

  const openAdd = () => {
    setForm({ studentId: demoStudents[0].id, courseId: courses[0].id, progress: "0" });
    setFormErrors({});
    setAddOpen(true);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const exists = list.some(
      (e) => e.studentId === form.studentId && e.courseId === form.courseId && e.status !== "cancelled",
    );
    if (exists) errs.duplicate = "این دانشجو قبلاً در این دوره ثبت‌نام کرده است";
    const progress = Number(form.progress);
    if (Number.isNaN(progress) || progress < 0 || progress > 100) errs.progress = "پیشرفت بین ۰ تا ۱۰۰";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast("error", "ثبت‌نام ممکن نیست؛ خطاها را بررسی کن.");
      return;
    }
    const enrollment: Enrollment = {
      id: `e-${Date.now().toString(36)}`,
      studentId: form.studentId,
      courseId: form.courseId,
      date: new Date().toISOString().slice(0, 10),
      progress: Number(form.progress),
      status: "active",
    };
    setList((prev) => [enrollment, ...prev]);
    setAddOpen(false);
    toast("success", "نمایشی: ثبت‌نام جدید ایجاد شد.");
  };

  const saveProgress = (e: Enrollment, value: number) => {
    setList((prev) => prev.map((x) => (x.id === e.id ? { ...x, progress: value } : x)));
    toast("success", "پیشرفت دوره با موفقیت به‌روزرسانی شد (نمایشی).");
  };

  const setStatus = (e: Enrollment, status: Enrollment["status"]) => {
    setList((prev) => prev.map((x) => (x.id === e.id ? { ...x, status } : x)));
    toast("info", `وضعیت ثبت‌نام به «${enrollmentStatusLabels[status]}» تغییر کرد (نمایشی).`);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setList((prev) => prev.filter((x) => x.id !== deleteTarget.id));
    setDeleteTarget(null);
    toast("success", "ثبت‌نام حذف شد (نمایشی).");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-navy-900">ثبت‌نام‌ها</h1>
          <p className="mt-1 text-sm text-slate-500">
            مدیریت ثبت‌نام دانشجویان در دوره‌ها — داده نمایشی جلسه جاری
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DemoBadge className="hidden md:inline-flex" />
          <Button size="sm" onClick={openAdd}>
            <Plus size={15} />
            ثبت‌نام جدید
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-card sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جست‌وجوی نام دانشجو یا دوره…"
            aria-label="جست‌وجوی ثبت‌نام"
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
          <option value="active">در حال یادگیری</option>
          <option value="completed">تکمیل شده</option>
          <option value="cancelled">لغو شده</option>
        </select>
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          aria-label="فیلتر دوره"
          className="input-base w-auto sm:w-52"
        >
          <option value="">همه دوره‌ها</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
        {rows.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-50 text-royal-400">
              <ClipboardList size={22} />
            </span>
            <p className="font-bold text-navy-900">ثبت‌نامی یافت نشد</p>
            <p className="mt-1 text-sm text-slate-400">فیلترها را تغییر بده یا ثبت‌نام جدیدی اضافه کن.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-slate-50/70 text-xs text-slate-400">
                <tr>
                  <th className="px-5 py-3.5 text-start font-medium">دانشجو</th>
                  <th className="px-3 py-3.5 text-start font-medium">دوره</th>
                  <th className="px-3 py-3.5 text-start font-medium">تاریخ</th>
                  <th className="px-3 py-3.5 text-start font-medium">پیشرفت (٪) — قابل ویرایش</th>
                  <th className="px-3 py-3.5 text-start font-medium">وضعیت</th>
                  <th className="px-5 py-3.5 text-start font-medium">اقدامات</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((e) => {
                  const student = demoStudents.find((s) => s.id === e.studentId);
                  const course = courses.find((c) => c.id === e.courseId);
                  return (
                    <tr key={e.id} className="border-t border-slate-50 transition-colors hover:bg-slate-50/50">
                      <td className="px-5 py-3 font-medium text-navy-900">{student?.name ?? e.studentId}</td>
                      <td className="px-3 py-3">
                        <p className="max-w-44 truncate text-slate-700">{course?.title ?? "—"}</p>
                        <p className="text-[10px] text-slate-400">
                          مدرس: {course ? instructorById[course.instructorId]?.name : "—"}
                        </p>
                      </td>
                      <td className="px-3 py-3 text-slate-500">{formatFaDate(e.date)}</td>
                      <td className="px-3 py-3">
                        <ProgressEditor value={e.progress} onSave={(v) => saveProgress(e, v)} disabled={e.status === "cancelled"} />
                      </td>
                      <td className="px-3 py-3">
                        <Badge tone={e.status === "completed" ? "green" : e.status === "cancelled" ? "red" : "royal"}>
                          {enrollmentStatusLabels[e.status]}
                        </Badge>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          {e.status === "cancelled" ? (
                            <button
                              onClick={() => setStatus(e, "active")}
                              className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                              title="فعال‌سازی مجدد"
                              aria-label="فعال‌سازی مجدد"
                            >
                              <Undo2 size={15} />
                            </button>
                          ) : (
                            <button
                              onClick={() => setStatus(e, "cancelled")}
                              className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600"
                              title="لغو ثبت‌نام"
                              aria-label="لغو ثبت‌نام"
                            >
                              <X size={15} />
                            </button>
                          )}
                          {e.status === "active" && (
                            <button
                              onClick={() => setStatus(e, "completed")}
                              className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                              title="تکمیل دوره"
                              aria-label="تکمیل دوره"
                            >
                              <Save size={15} />
                            </button>
                          )}
                          <button
                            onClick={() => setDeleteTarget(e)}
                            className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                            title="حذف"
                            aria-label="حذف ثبت‌نام"
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

      {/* Add enrollment modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="ثبت‌نام جدید">
        <form onSubmit={submitAdd} noValidate className="space-y-4">
          <SelectField
            label="دانشجو"
            value={form.studentId}
            onChange={(e) => setForm((p) => ({ ...p, studentId: e.target.value }))}
            required
          >
            {demoStudents.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </SelectField>
          <SelectField
            label="دوره"
            value={form.courseId}
            onChange={(e) => setForm((p) => ({ ...p, courseId: e.target.value }))}
            error={formErrors.duplicate}
            required
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </SelectField>
          <TextField
            label="پیشرفت اولیه (٪)"
            type="number"
            dir="ltr"
            min={0}
            max={100}
            value={form.progress}
            onChange={(e) => setForm((p) => ({ ...p, progress: e.target.value }))}
            error={formErrors.progress}
          />
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-[11px] leading-5 text-amber-700">
            نسخه نمایشی: این ثبت‌نام فقط در حافظه این جلسه تغییر می‌کند.
          </p>
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <Button type="button" variant="ghost" onClick={() => setAddOpen(false)}>انصراف</Button>
            <Button type="submit">ایجاد ثبت‌نام</Button>
          </div>
        </form>
      </Modal>

      {/* Delete confirmation */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="حذف ثبت‌نام">
        <p className="text-sm leading-7 text-slate-600">
          از حذف این ثبت‌نام مطمئنی؟ این اقدام قابل بازگشت نیست.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>انصراف</Button>
          <Button variant="danger" onClick={confirmDelete}>بله، حذف شود</Button>
        </div>
      </Modal>
    </div>
  );
}

function ProgressEditor({
  value,
  onSave,
  disabled,
}: {
  value: number;
  onSave: (v: number) => void;
  disabled?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));

  if (disabled) {
    return (
      <div className="w-36">
        <ProgressBar value={value} showLabel={false} color="slate" />
        <span className="mt-1 block text-[10px] text-slate-300">٪{toFa(value)}</span>
      </div>
    );
  }

  if (!editing) {
    return (
      <button
        onClick={() => {
          setDraft(String(value));
          setEditing(true);
        }}
        className="group flex w-36 cursor-pointer items-center gap-2"
        title="برای ویرایش کلیک کن"
        aria-label={`پیشرفت ٪${toFa(value)} — برای ویرایش کلیک کن`}
      >
        <ProgressBar value={value} showLabel={false} color="royal" className="flex-1" />
        <span className="text-xs font-bold text-navy-800 group-hover:text-royal-700">٪{toFa(value)}</span>
      </button>
    );
  }

  return (
    <div className="flex w-36 items-center gap-1.5">
      <input
        type="number"
        min={0}
        max={100}
        dir="ltr"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const v = Math.max(0, Math.min(100, Number(draft)));
            if (!Number.isNaN(v)) {
              onSave(Math.round(v));
              setEditing(false);
            }
          }
          if (e.key === "Escape") setEditing(false);
        }}
        aria-label="پیشرفت جدید"
        className="input-base !px-2 !py-1 text-xs"
        autoFocus
      />
      <button
        onClick={() => {
          const v = Math.max(0, Math.min(100, Number(draft)));
          if (!Number.isNaN(v)) {
            onSave(Math.round(v));
            setEditing(false);
          }
        }}
        className="cursor-pointer rounded-lg bg-royal-600 p-1.5 text-white transition-colors hover:bg-royal-700"
        aria-label="ذخیره پیشرفت"
      >
        <Save size={13} />
      </button>
      <button
        onClick={() => setEditing(false)}
        className="cursor-pointer rounded-lg p-1.5 text-slate-400 hover:text-slate-600"
        aria-label="لغو ویرایش"
      >
        <X size={13} />
      </button>
    </div>
  );
}
