import type { Enrollment, Student } from "../types";

export const students: Student[] = [
  { id: "s-01", name: "سارا محمدی", email: "sara.m@example.com", phone: "۰۹۱۲۱۱۱۲۲۳۳", joinDate: "2025-09-01", status: "active" },
  { id: "s-02", name: "علی رضایی", email: "ali.r@example.com", phone: "۰۹۱۳۲۲۲۳۳۴۴", joinDate: "2025-08-14", status: "active" },
  { id: "s-03", name: "مهدی نوری", email: "mehdi.n@example.com", phone: "۰۹۱۴۳۳۳۴۴۵۵", joinDate: "2025-10-02", status: "active" },
  { id: "s-04", name: "فاطمه حسینی", email: "fateme.h@example.com", phone: "۰۹۱۵۴۴۴۵۵۶۶", joinDate: "2025-07-19", status: "inactive" },
  { id: "s-05", name: "امیر کاظمی", email: "amir.k@example.com", phone: "۰۹۱۶۵۵۵۶۶۷۷", joinDate: "2025-11-05", status: "active" },
  { id: "s-06", name: "نگین شریفی", email: "negin.s@example.com", phone: "۰۹۱۷۶۶۶۷۷۸۸", joinDate: "2025-09-28", status: "active" },
  { id: "s-07", name: "حسین یوسفی", email: "hossein.y@example.com", phone: "۰۹۱۸۷۷۷۸۸۹۹", joinDate: "2025-06-30", status: "active" },
  { id: "s-08", name: "زهرا عبادی", email: "zahra.a@example.com", phone: "۰۹۱۹۸۸۸۹۹۰۰", joinDate: "2025-10-21", status: "active" },
  { id: "s-09", name: "پویا صالحی", email: "pooya.s@example.com", phone: "۰۹۲۰۹۹۹۰۰۱۱", joinDate: "2025-08-08", status: "inactive" },
  { id: "s-10", name: "مریم اسدی", email: "maryam.e@example.com", phone: "۰۹۲۱۱۱۱۱۲۲۰", joinDate: "2025-11-15", status: "active" },
];

export const studentById = Object.fromEntries(
  students.map((s) => [s.id, s]),
) as Record<string, Student>;

export const enrollments: Enrollment[] = [
  { id: "e-01", studentId: "s-01", courseId: "c-01", date: "2025-09-05", progress: 68, status: "active" },
  { id: "e-02", studentId: "s-01", courseId: "c-03", date: "2025-10-10", progress: 42, status: "active" },
  { id: "e-03", studentId: "s-01", courseId: "c-08", date: "2025-11-01", progress: 100, status: "completed" },
  { id: "e-04", studentId: "s-02", courseId: "c-02", date: "2025-08-20", progress: 85, status: "active" },
  { id: "e-05", studentId: "s-02", courseId: "c-04", date: "2025-09-12", progress: 30, status: "active" },
  { id: "e-06", studentId: "s-03", courseId: "c-01", date: "2025-10-08", progress: 55, status: "active" },
  { id: "e-07", studentId: "s-03", courseId: "c-06", date: "2025-10-15", progress: 12, status: "active" },
  { id: "e-08", studentId: "s-04", courseId: "c-05", date: "2025-07-25", progress: 100, status: "completed" },
  { id: "e-09", studentId: "s-05", courseId: "c-04", date: "2025-11-10", progress: 48, status: "active" },
  { id: "e-10", studentId: "s-05", courseId: "c-07", date: "2025-11-12", progress: 20, status: "active" },
  { id: "e-11", studentId: "s-06", courseId: "c-03", date: "2025-10-02", progress: 74, status: "active" },
  { id: "e-12", studentId: "s-06", courseId: "c-08", date: "2025-10-06", progress: 100, status: "completed" },
  { id: "e-13", studentId: "s-07", courseId: "c-02", date: "2025-07-05", progress: 100, status: "completed" },
  { id: "e-14", studentId: "s-07", courseId: "c-07", date: "2025-11-20", progress: 8, status: "active" },
  { id: "e-15", studentId: "s-08", courseId: "c-01", date: "2025-10-25", progress: 36, status: "active" },
  { id: "e-16", studentId: "s-08", courseId: "c-06", date: "2025-11-02", progress: 60, status: "active" },
  { id: "e-17", studentId: "s-09", courseId: "c-05", date: "2025-08-15", progress: 22, status: "cancelled" },
  { id: "e-18", studentId: "s-10", courseId: "c-02", date: "2025-11-18", progress: 15, status: "active" },
  { id: "e-19", studentId: "s-10", courseId: "c-08", date: "2025-11-20", progress: 40, status: "active" },
  { id: "e-20", studentId: "s-09", courseId: "c-01", date: "2025-08-18", progress: 90, status: "completed" },
];

export const monthlyEnrollments = [
  { label: "دی", value: 42 },
  { label: "بهمن", value: 55 },
  { label: "اسفند", value: 61 },
  { label: "فروردین", value: 48 },
  { label: "اردیبهشت", value: 70 },
  { label: "خرداد", value: 82 },
  { label: "تیر", value: 96 },
  { label: "مرداد", value: 88 },
  { label: "شهریور", value: 104 },
  { label: "مهر", value: 121 },
  { label: "آبان", value: 138 },
  { label: "آذر", value: 152 },
];

export const revenueByMonth = [
  { label: "دی", value: 34 },
  { label: "بهمن", value: 45 },
  { label: "اسفند", value: 51 },
  { label: "فروردین", value: 42 },
  { label: "اردیبهشت", value: 60 },
  { label: "خرداد", value: 71 },
  { label: "تیر", value: 84 },
  { label: "مرداد", value: 78 },
  { label: "شهریور", value: 92 },
  { label: "مهر", value: 108 },
  { label: "آبان", value: 121 },
  { label: "آذر", value: 136 },
];
