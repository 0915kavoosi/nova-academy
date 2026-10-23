import DashboardShell from "./DashboardShell";
import { LayoutDashboard, UserCircle } from "lucide-react";
import { currentStudent } from "../../data/studentDashboard";

export default function StudentLayout() {
  return (
    <DashboardShell
      title="داشبورد دانشجو"
      userName={currentStudent.name}
      userRole="دانشجو"
      initials={currentStudent.initials}
      gradient={currentStudent.gradient}
      nav={[
        { to: "/dashboard", label: "نمای کلی", icon: <LayoutDashboard size={18} />, end: true },
        { to: "/dashboard/profile", label: "پروفایل من", icon: <UserCircle size={18} /> },
      ]}
    />
  );
}
