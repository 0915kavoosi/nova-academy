export const currentStudent = {
  id: "s-01",
  name: "سارا محمدی",
  email: "sara.m@example.com",
  phone: "۰۹۱۲۱۱۱۲۲۳۳",
  joinDate: "2025-09-01",
  bio: "علاقه‌مند به طراحی وب و رابط کاربری؛ در حال یادگیری مسیر فرانت‌اند.",
  goal: "دوره‌های طراحی وب",
  initials: "س‌م",
  gradient: "from-sky-500 to-royal-700",
};

export const weeklyActivity = [
  { label: "شنبه", value: 45 },
  { label: "یکشنبه", value: 70 },
  { label: "دوشنبه", value: 30 },
  { label: "سه‌شنبه", value: 90 },
  { label: "چهارشنبه", value: 60 },
  { label: "پنجشنبه", value: 110 },
  { label: "جمعه", value: 25 },
];

export const upcomingClasses = [
  {
    id: "k-01",
    title: "کلاس رفع اشکال پروژه Flexbox",
    courseId: "c-01",
    instructorId: "i-03",
    date: "2026-10-26",
    time: "۱۸:۰۰ تا ۱۹:۳۰",
    type: "آنلاین (بایدنو)",
  },
  {
    id: "k-02",
    title: "جلسه منتورینگ پروتوتایپ Figma",
    courseId: "c-03",
    instructorId: "i-02",
    date: "2026-10-28",
    time: "۲۰:۰۰ تا ۲۱:۰۰",
    type: "آنلاین (بایدنو)",
  },
  {
    id: "k-03",
    title: "کارگاه معرفی مسیر شغلی فرانت‌اند",
    courseId: "c-04",
    instructorId: "i-01",
    date: "2026-11-02",
    time: "۱۷:۰۰ تا ۱۸:۳۰",
    type: "وبینار عمومی",
  },
];

export const notifications = [
  {
    id: "n-01",
    title: "یادآوری کلاس",
    text: "کلاس رفع اشکال پروژه Flexbox، دوشنبه ساعت ۱۸:۰۰ برگزار می‌شود.",
    time: "۲ ساعت پیش",
    type: "class" as const,
    unread: true,
  },
  {
    id: "n-02",
    title: "پاسخ مدرس به سؤال شما",
    text: "پاسخ سؤال شما درباره «مدیا کوئری و نقاط شکست» در بخش پرسش و پاسخ دوره طراحی وب ثبت شد.",
    time: "دیروز",
    type: "message" as const,
    unread: true,
  },
  {
    id: "n-03",
    title: "گواهی صادر شد",
    text: "گواهی پایان دوره «تحلیل داده با Excel» برای شما صادر شد و از پروفایل قابل دانلود است.",
    time: "۳ روز پیش",
    type: "award" as const,
    unread: false,
  },
  {
    id: "n-04",
    title: "به‌روزرسانی دوره",
    text: "دو درس جدید به بخش «CSS Grid» دوره طراحی وب اضافه شد.",
    time: "۱ هفته پیش",
    type: "update" as const,
    unread: false,
  },
];

export const studentGoals = [
  { id: "g1", label: "یادگیری CSS Grid", current: 8, total: 12 },
  { id: "g2", label: "تمرین هفتگی (۴ جلسه)", current: 3, total: 4 },
  { id: "g3", label: "تکمیل پروژه لندینگ پیج", current: 65, total: 100 },
];
