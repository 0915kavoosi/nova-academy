import DashboardShell from "./DashboardShell";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
} from "lucide-react";

export default function AdminLayout() {
  return (
    <DashboardShell
      title="پنل مدیریت"
      userName="مدیر آکادمی"
      userRole="مدیر سیستم (نمایشی)"
      initials="م‌ا"
      gradient="from-navy-700 to-royal-900"
      nav={[
        { to: "/admin", label: "نمای کلی", icon: <LayoutDashboard size={18} />, end: true },
        { to: "/admin/courses", label: "مدیریت دوره‌ها", icon: <BookOpen size={18} /> },
        { to: "/admin/students", label: "دانشجویان", icon: <Users size={18} /> },
        { to: "/admin/enrollments", label: "ثبت‌نام‌ها", icon: <ClipboardList size={18} /> },
      ]}
    />
  );
}
