import type { Instructor } from "../types";

export const instructors: Instructor[] = [
  {
    id: "i-01",
    name: "دکتر امیر رستمی",
    title: "مهندس نرم‌افزار و مدرس برنامه‌نویسی",
    initials: "ا‌ر",
    gradient: "from-royal-500 to-navy-700",
    bio: "بیش از ۱۲ سال تجربه توسعه نرم‌افزار و آموزش برنامه‌نویسی، همراه با همکاری در پروژه‌های سازمانی متعدد.",
    rating: 4.9,
    studentsCount: 8400,
    coursesCount: 3,
  },
  {
    id: "i-02",
    name: "نگار احمدی",
    title: "طراح تجربه و رابط کاربری",
    initials: "ن‌ا",
    gradient: "from-indigo-500 to-royal-700",
    bio: "طراح ارشد رابط کاربری با تمرکز بر سیستم‌های طراحی و تجربه کاربری محصول‌های دیجیتال.",
    rating: 4.8,
    studentsCount: 6100,
    coursesCount: 2,
  },
  {
    id: "i-03",
    name: "سامان کریمی",
    title: "متخصص توسعه وب و فرانت‌اند",
    initials: "س‌ک",
    gradient: "from-sky-500 to-navy-800",
    bio: "توسعه‌دهنده وب با ده سال تجربه ساخت محصول‌های تحت وب و آموزش تخصص‌های فرانت‌اند مدرن.",
    rating: 4.7,
    studentsCount: 5200,
    coursesCount: 2,
  },
  {
    id: "i-04",
    name: "مریم صادقی",
    title: "مشاور بازاریابی دیجیتال",
    initials: "م‌ص",
    gradient: "from-blue-500 to-royal-800",
    bio: "مشاور و مدرس بازاریابی دیجیتال با تجربه مدیریت کمپین‌های تبلیغاتی برای برندهای داخلی و بین‌المللی.",
    rating: 4.8,
    studentsCount: 4300,
    coursesCount: 1,
  },
];

export const instructorById = Object.fromEntries(
  instructors.map((i) => [i.id, i]),
) as Record<string, Instructor>;
