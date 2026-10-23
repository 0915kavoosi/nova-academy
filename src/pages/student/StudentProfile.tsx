import { useState } from "react";
import { GraduationCap, Camera, Info, X } from "lucide-react";
import { currentStudent } from "../../data/studentDashboard";
import { enrollments } from "../../data/people";
import { useCourses } from "../../context/CoursesContext";
import { formatFaDate, toFa } from "../../lib/format";
import { TextField, SelectField, TextareaField } from "../../components/ui/FormFields";
import Button from "../../components/ui/Button";
import DemoBadge from "../../components/DemoBadge";
import { useToast } from "../../components/ui/Toast";

export default function StudentProfile() {
  const { toast } = useToast();
  const { courses } = useCourses();
  const [name, setName] = useState(currentStudent.name);
  const [email, setEmail] = useState(currentStudent.email);
  const [phone, setPhone] = useState(currentStudent.phone);
  const [goal, setGoal] = useState(currentStudent.goal);
  const [bio, setBio] = useState(currentStudent.bio);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const myCourses = enrollments
    .filter((e) => e.studentId === currentStudent.id)
    .map((e) => courses.find((c) => c.id === e.courseId)?.title)
    .filter(Boolean);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "نام الزامی است";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "فرمت ایمیل معتبر نیست";
    const asciiPhone = phone.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
    if (!/^09\d{9}$/.test(asciiPhone)) errs.phone = "شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast("error", "فرم دارای خطاست؛ فیلدهای مشخص‌شده را بررسی کن.");
      return;
    }
    toast("success", "نمایشی: تغییرات پروفایل در این دمو ذخیرهٔ واقعی نمی‌شود.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-navy-900">پروفایل من</h1>
          <p className="mt-1 text-sm text-slate-500">
            مشاهده و ویرایش اطلاعات حساب کاربری
          </p>
        </div>
        <DemoBadge />
      </div>

      {/* Header card */}
      <div className="flex flex-wrap items-center gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
        <div className="relative">
          <span
            className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-bl text-xl font-black text-white ${currentStudent.gradient}`}
          >
            {currentStudent.initials}
          </span>
          <button
            type="button"
            onClick={() =>
              toast("info", "نسخه نمایشی: بارگذاری تصویر پروفایل در دسترس نیست.")
            }
            aria-label="تغییر تصویر پروفایل (نمایشی)"
            className="absolute -bottom-1 -left-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white text-slate-400 shadow-card transition-colors hover:text-royal-600"
          >
            <Camera size={13} />
          </button>
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-black text-navy-900">{currentStudent.name}</h2>
          <p className="mt-0.5 text-sm text-slate-500">{currentStudent.email}</p>
          <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-400">
            <span>عضویت از {formatFaDate(currentStudent.joinDate)}</span>
            <span>زیر گروه: {currentStudent.goal}</span>
          </div>
        </div>
        <div className="ms-auto flex gap-3 text-center">
          <div className="rounded-xl bg-royal-50 px-4 py-2">
            <p className="text-base font-black text-royal-700">{toFa(myCourses.length)}</p>
            <p className="text-[10px] text-royal-600/70">دوره فعال</p>
          </div>
          <div className="rounded-xl bg-royal-50 px-4 py-2">
            <p className="text-base font-black text-royal-700">{toFa(12)}</p>
            <p className="text-[10px] text-royal-600/70">دنباله یادگیری</p>
          </div>
        </div>
      </div>

      {/* Edit form */}
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:p-7"
        noValidate
      >
        <h2 className="mb-5 flex items-center gap-2 font-black text-navy-900">
          <GraduationCap size={18} className="text-royal-600" />
          ویرایش اطلاعات
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="نام و نام خانوادگی"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            required
          />
          <TextField
            label="ایمیل"
            type="email"
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
          />
          <TextField
            label="شماره موبایل"
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={errors.phone}
            hint="مثال: ۰۹۱۲۱۱۱۲۲۳۳"
            required
          />
          <SelectField label="هدف یادگیری" value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option>دوره‌های طراحی وب</option>
            <option>دوره‌های برنامه‌نویسی</option>
            <option>دوره‌های مارکتینگ</option>
            <option>دوره‌های تحلیل داده</option>
          </SelectField>
          <div className="sm:col-span-2">
            <TextareaField
              label="درباره من"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={220}
            />
            <p className="mt-1 text-left text-[10px] text-slate-300">{toFa(bio.length)} / ۲۲۰</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button type="submit">ذخیره تغییرات</Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setName(currentStudent.name);
              setEmail(currentStudent.email);
              setPhone(currentStudent.phone);
              setGoal(currentStudent.goal);
              setBio(currentStudent.bio);
              setErrors({});
              toast("info", "تغییرات به حالت اولیه برگشت.");
            }}
          >
            <X size={15} />
            انصراف
          </Button>
        </div>

        <p className="mt-4 flex items-start gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-[11px] leading-5 text-amber-700">
          <Info size={13} className="mt-0.5 shrink-0" />
          نسخه نمایشی: در این دمو احراز هویت واقعی وجود ندارد و اطلاعات ذخیره‌شده فقط محلی و زمانی است.
        </p>
      </form>
    </div>
  );
}
