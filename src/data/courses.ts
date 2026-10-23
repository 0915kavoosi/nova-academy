import type { Course } from "../types";

export const demoCourses: Course[] = [
  {
    id: "c-01",
    title: "آموزش جامع طراحی وب",
    instructorId: "i-03",
    categoryId: "web",
    price: 1980000,
    oldPrice: 2600000,
    durationHours: 42,
    lessonCount: 96,
    studentCount: 1832,
    level: "beginner",
    rating: 4.8,
    gradient: "from-sky-500 to-navy-700",
    icon: "globe",
    shortDescription:
      "از HTML و CSS تا ساخت پروژه‌های واقعی واکنش‌گرا؛ مسیر کامل ورود به دنیای طراحی وب.",
    description:
      "در این دوره از صفر شروع می‌کنیم و گام‌به‌گام با HTML، CSS و جاوااسکریپت چند صفحه حرفه‌ای و واکنش‌گرا می‌سازیم. تمرکز اصلی دوره بر یادگیری پروژه‌محور است؛ یعنی پس از هر بخش، مهارت آموخته‌شده را در یک پروژه واقعی به کار می‌گیرید. در پایان دوره، شما توانایی ساخت وب‌سایت‌های واکنش‌گرا، بهینه و آماده ارائه به کارفرما را خواهید داشت.",
    syllabus: [
      {
        title: "مبانی HTML و ساختار صفحه",
        lessons: [
          { title: "معرفی دوره و مسیر یادگیری", duration: "۰۸:۲۴", free: true },
          { title: "ساختار پایه یک صفحه وب", duration: "۱۴:۱۰", free: true },
          { title: "تگ‌های پرکاربرد متنی و لیست‌ها", duration: "۱۸:۳۲" },
          { title: "فرم‌ها و جدول‌ها در HTML", duration: "۲۱:۰۵" },
        ],
      },
      {
        title: "CSS و طراحی واکنش‌گرا",
        lessons: [
          { title: "انتخابگرها و مدل باکس", duration: "۲۲:۴۰" },
          { title: "چیدمان با Flexbox", duration: "۲۶:۱۸" },
          { title: "چیدمان با CSS Grid", duration: "۲۴:۵۲" },
          { title: "طراحی واکنش‌گرا و مدیا کوئری", duration: "۱۹:۳۳" },
        ],
      },
      {
        title: "جاوااسکریپت کاربردی",
        lessons: [
          { title: "متغیرها، شرط‌ها و حلقه‌ها", duration: "۲۸:۱۱" },
          { title: "کار با DOM و رویدادها", duration: "۳۱:۰۲" },
          { title: "فرم‌ها و اعتبارسنجی ساده", duration: "۲۵:۴۴" },
        ],
      },
      {
        title: "پروژه پایانی",
        lessons: [
          { title: "ساخت لندینگ پیج کامل", duration: "۴۲:۱۵" },
          { title: "بهینه‌سازی و انتشار سایت", duration: "۱۶:۵۰" },
        ],
      },
    ],
    published: true,
    createdAt: "2025-09-14",
  },
  {
    id: "c-02",
    title: "برنامه‌نویسی پایتون",
    instructorId: "i-01",
    categoryId: "programming",
    price: 2450000,
    oldPrice: 3200000,
    durationHours: 56,
    lessonCount: 118,
    studentCount: 2410,
    level: "beginner",
    rating: 4.9,
    gradient: "from-royal-500 to-navy-800",
    icon: "code",
    shortDescription:
      "یادگیری پایتون از صفر تا ساخت برنامه‌های واقعی؛ مناسب شروع مسیر برنامه‌نویسی.",
    description:
      "پایتون یکی از محبوب‌ترین زبان‌های برنامه‌نویسی جهان است و نقطه شروع عالی برای ورود به دنیای برنامه‌نویسی محسوب می‌شود. در این دوره مباحث پایه زبان، کار با داده‌ها، توابع و شیءگرایی را یاد می‌گیرید و در نهایت با ساخت چند پروژه کاربردی از جمله یک سیستم مدیریت وظایف، مهارت خود را تثبیت می‌کنید.",
    syllabus: [
      {
        title: "شروع با پایتون",
        lessons: [
          { title: "نصب ابزارها و اولین برنامه", duration: "۱۲:۳۰", free: true },
          { title: "متغیرها و انواع داده", duration: "۲۰:۱۵", free: true },
          { title: "شرط‌ها و حلقه‌ها", duration: "۲۴:۴۰" },
        ],
      },
      {
        title: "ساختارهای داده",
        lessons: [
          { title: "لیست‌ها و دیکشنری‌ها", duration: "۲۶:۵۰" },
          { title: "توابع و ماژول‌ها", duration: "۳۰:۰۵" },
          { title: "کار با فایل‌ها", duration: "۲۲:۱۸" },
        ],
      },
      {
        title: "شیءگرایی و پروژه",
        lessons: [
          { title: "کلاس‌ها و شیءگرایی در پایتون", duration: "۳۴:۲۰" },
          { title: "پروژه: سیستم مدیریت وظایف", duration: "۴۸:۳۰" },
          { title: "مسیرهای ادامه یادگیری", duration: "۱۰:۱۲" },
        ],
      },
    ],
    published: true,
    createdAt: "2025-08-02",
  },
  {
    id: "c-03",
    title: "طراحی رابط کاربری با Figma",
    instructorId: "i-02",
    categoryId: "uiux",
    price: 1690000,
    durationHours: 31,
    lessonCount: 64,
    studentCount: 1578,
    level: "intermediate",
    rating: 4.7,
    gradient: "from-indigo-500 to-royal-800",
    icon: "palette",
    shortDescription:
      "طراحی رابط‌های مدرن، ساخت سیستم طراحی و پروتوتایپ تعاملی با Figma.",
    description:
      "در این دوره با ابزار حرفه‌ای Figma از سطح مقدماتی تا طراحی رابط‌های پیچیده پیش می‌رویم. مباحثی مانند سیستم طراحی، کامپوننت‌سازی، پروتوتایپ تعاملی و تحویل طراحی به تیم توسعه پوشش داده می‌شود. در پایان دوره یک رابط کاربری کامل برای یک محصول واقعی طراحی می‌کنید.",
    syllabus: [
      {
        title: "آشنایی با Figma",
        lessons: [
          { title: "محیط کار و ابزارهای پایه", duration: "۱۴:۲۰", free: true },
          { title: "قاب‌ها و لایه‌بندی", duration: "۱۸:۴۵" },
        ],
      },
      {
        title: "طراحی و کامپوننت‌سازی",
        lessons: [
          { title: "کامپوننت‌ها و واریانت‌ها", duration: "۲۶:۱۰" },
          { title: "سیستم طراحی و استایل‌ها", duration: "۲۹:۳۰" },
          { title: "Auto Layout حرفه‌ای", duration: "۲۳:۵۵" },
        ],
      },
      {
        title: "پروتوتایپ و تحویل",
        lessons: [
          { title: "پروتوتایپ تعاملی", duration: "۲۱:۴۰" },
          { title: "پروژه پایانی و تحویل به تیم توسعه", duration: "۳۵:۰۰" },
        ],
      },
    ],
    published: true,
    createdAt: "2025-10-05",
  },
  {
    id: "c-04",
    title: "آموزش React و TypeScript",
    instructorId: "i-01",
    categoryId: "programming",
    price: 3250000,
    oldPrice: 3900000,
    durationHours: 64,
    lessonCount: 132,
    studentCount: 1976,
    level: "advanced",
    rating: 4.9,
    gradient: "from-blue-500 to-navy-900",
    icon: "atom",
    shortDescription:
      "ساخت اپلیکیشن‌های مدرن وب با React و TypeScript؛ از مباحث پایه تا الگوهای حرفه‌ای.",
    description:
      "این دوره برای افرادی طراحی شده که می‌خواهند به‌صورت حرفه‌ای فرانت‌اند مدرن کار کنند. مباحث React از پایه تا الگوهای پیشرفته همراه با TypeScript و مدیریت state پوشش داده می‌شود. پروژه اصلی دوره ساخت یک اپلیکیشن مدیریت کامل است که تمام مفاهیم را در عمل به کار می‌گیرد.",
    syllabus: [
      {
        title: "مبانی React",
        lessons: [
          { title: "کامپوننت‌ها و props", duration: "۲۴:۳۰", free: true },
          { title: "state و رویدادها", duration: "۲۸:۱۵" },
          { title: "هوک‌های پرکاربرد", duration: "۳۲:۴۰" },
        ],
      },
      {
        title: "TypeScript در پروژه واقعی",
        lessons: [
          { title: "تایپ‌ها و اینترفیس‌ها", duration: "۲۶:۵۰" },
          { title: "تایپ کردن props و state", duration: "۲۲:۱۰" },
        ],
      },
      {
        title: "الگوهای حرفه‌ای و پروژه",
        lessons: [
          { title: "مدیریت state سراسری", duration: "۳۶:۲۵" },
          { title: "کار با API و درخواست‌ها", duration: "۳۰:۴۵" },
          { title: "پروژه: اپلیکیشن مدیریت کامل", duration: "۶۲:۰۰" },
        ],
      },
    ],
    published: true,
    createdAt: "2025-07-20",
  },
  {
    id: "c-05",
    title: "بازاریابی دیجیتال",
    instructorId: "i-04",
    categoryId: "marketing",
    price: 1290000,
    durationHours: 27,
    lessonCount: 52,
    studentCount: 2140,
    level: "beginner",
    rating: 4.6,
    gradient: "from-royal-400 to-blue-700",
    icon: "megaphone",
    shortDescription:
      "استراتژی محتوا، تبلیغات پولی و تحلیل کمپین؛ بازاریابی دیجیتال از پایه.",
    description:
      "در این دوره با ارکان بازاریابی دیجیتال آشنا می‌شوید: از تدوین استراتژی محتوا و مدیریت شبکه‌های اجتماعی تا تبلیغات پولی و اندازه‌گیری بازدهی کمپین‌ها. مثال‌ها و تمرین‌های دوره بر اساس تجربه‌های واقعی بازار ایران طراحی شده‌اند.",
    syllabus: [
      {
        title: "مبانی و استراتژی",
        lessons: [
          { title: "دیدگاه کلی بازاریابی دیجیتال", duration: "۱۶:۲۰", free: true },
          { title: "تدوین استراتژی محتوا", duration: "۲۲:۱۰" },
        ],
      },
      {
        title: "کانال‌ها و تبلیغات",
        lessons: [
          { title: "بازاریابی شبکه‌های اجتماعی", duration: "۲۵:۰۰" },
          { title: "تبلیغات پولی و بودجه‌بندی", duration: "۲۸:۳۰" },
          { title: "ایمیل مارکتینگ", duration: "۱۸:۴۰" },
        ],
      },
      {
        title: "تحلیل و بهینه‌سازی",
        lessons: [
          { title: "اندازه‌گیری بازدهی کمپین", duration: "۲۴:۱۵" },
          { title: "پروژه: برنامه بازاریابی یک برند", duration: "۳۰:۰۰" },
        ],
      },
    ],
    published: true,
    createdAt: "2025-06-11",
  },
  {
    id: "c-06",
    title: "آموزش سئو",
    instructorId: "i-04",
    categoryId: "seo",
    price: 1150000,
    oldPrice: 1550000,
    durationHours: 24,
    lessonCount: 48,
    studentCount: 1895,
    level: "intermediate",
    rating: 4.7,
    gradient: "from-navy-600 to-royal-900",
    icon: "search",
    shortDescription:
      "سئو تکنیکال، تحقیق کلمات کلیدی و لینک‌سازی؛ رشد ارگانیک ترافیک سایت.",
    description:
      "در این دوره یاد می‌گیرید چگونه سایت‌ها را برای موتورهای جست‌وجو بهینه کنید. از تحقیق کلمات کلیدی و بهینه‌سازی محتوا تا سئو تکنیکال و استراتژی لینک‌سازی، همه با مثال‌های واقعی و ابزارهای پرکاربرد آموزش داده می‌شود.",
    syllabus: [
      {
        title: "مبانی سئو",
        lessons: [
          { title: "سئو چگونه کار می‌کند؟", duration: "۱۴:۵۰", free: true },
          { title: "تحقیق کلمات کلیدی", duration: "۲۳:۳۰" },
        ],
      },
      {
        title: "سئو صفحه و تکنیکال",
        lessons: [
          { title: "بهینه‌سازی محتوا و متاتگ‌ها", duration: "۲۶:۲۰" },
          { title: "سئو تکنیکال و سرعت سایت", duration: "۲۹:۱۰" },
        ],
      },
      {
        title: "رشد و گزارش‌گیری",
        lessons: [
          { title: "استراتژی لینک‌سازی", duration: "۲۵:۴۰" },
          { title: "تحلیل و گزارش سئو", duration: "۲۰:۳۰" },
        ],
      },
    ],
    published: true,
    createdAt: "2025-05-18",
  },
  {
    id: "c-07",
    title: "ساخت API با Node.js",
    instructorId: "i-03",
    categoryId: "programming",
    price: 2890000,
    durationHours: 47,
    lessonCount: 102,
    studentCount: 1120,
    level: "advanced",
    rating: 4.8,
    gradient: "from-royal-600 to-navy-900",
    icon: "server",
    shortDescription:
      "طراحی و ساخت APIهای امن و مقیاس‌پذیر با Node.js و پایگاه داده.",
    description:
      "در این دوره به‌صورت پروژه‌محور یک API کامل و امن با Node.js می‌سازیم. مباحثی مانند احراز هویت، اعتبارسنجی داده، کار با پایگاه داده، تست و انتشار روی سرور پوشش داده می‌شود تا در پایان یک بک‌اند واقعی و آماده استخدام داشته باشید.",
    syllabus: [
      {
        title: "مبانی Node.js",
        lessons: [
          { title: "معماری Node و رویدادها", duration: "۲۰:۱۰", free: true },
          { title: "ساخت اولین سرور", duration: "۲۴:۳۰" },
        ],
      },
      {
        title: "طراحی API",
        lessons: [
          { title: "روت‌ها و کنترلرها", duration: "۲۸:۲۰" },
          { title: "اعتبارسنجی و مدیریت خطا", duration: "۲۶:۱۵" },
          { title: "احراز هویت و امنیت", duration: "۳۴:۵۰" },
        ],
      },
      {
        title: "پایگاه داده و انتشار",
        lessons: [
          { title: "کار با پایگاه داده", duration: "۳۸:۰۰" },
          { title: "تست و انتشار روی سرور", duration: "۳۰:۴۰" },
        ],
      },
    ],
    published: true,
    createdAt: "2025-11-08",
  },
  {
    id: "c-08",
    title: "تحلیل داده با Excel",
    instructorId: "i-01",
    categoryId: "data",
    price: 0,
    durationHours: 12,
    lessonCount: 26,
    studentCount: 4380,
    level: "beginner",
    rating: 4.5,
    gradient: "from-sky-400 to-royal-600",
    icon: "chart",
    shortDescription:
      "دوره رایگان؛ فرمول‌ها، جدول محوری و نمودارهای تحلیلی در Excel.",
    description:
      "این دوره رایگان نقطه شروع خوبی برای ورود به دنیای تحلیل داده است. با فرمول‌های پرکاربرد، جدول محوری و نمودارسازی آشنا می‌شوید و در پایان یک داشبورد تحلیلی ساده می‌سازید.",
    syllabus: [
      {
        title: "مبانی Excel",
        lessons: [
          { title: "محیط کار و داده‌ها", duration: "۱۲:۰۰", free: true },
          { title: "فرمول‌های پرکاربرد", duration: "۲۰:۳۰" },
        ],
      },
      {
        title: "تحلیل و نمایش",
        lessons: [
          { title: "جدول محوری", duration: "۲۴:۰۰" },
          { title: "نمودار و داشبورد ساده", duration: "۲۶:۴۵" },
        ],
      },
    ],
    published: true,
    createdAt: "2025-04-02",
  },
];
