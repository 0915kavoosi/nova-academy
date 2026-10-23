import { useEffect, useState, type ReactNode } from "react";import { NavLink, Outlet, useLocation, Link } from "react-router-dom";
import { X, ExternalLink, GraduationCap } from "lucide-react";
import DashboardHeader from "../ui/DashboardHeader";

export interface DashNavItem {
  to: string;
  label: string;
  icon: ReactNode;
  end?: boolean;
}

export default function DashboardShell({
  title,
  nav,
  userName,
  userRole,
  initials,
  gradient,
  children,
}: {
  title: string;
  nav: DashNavItem[];
  userName: string;
  userRole: string;
  initials: string;
  gradient: string;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
            <GraduationCap size={20} className="text-royal-300" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-black text-white">آکادمی نُوا</span>
            <span className="block text-[9px] text-navy-400">{title}</span>
          </span>
        </Link>
        <button
          className="cursor-pointer text-navy-300 hover:text-white lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="بستن منو"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4" aria-label={`منوی ${title}`}>
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-royal-600 text-white shadow-sm"
                  : "text-navy-200 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="shrink-0 border-t border-white/10 p-4">
        <Link
          to="/"
          className="mb-4 flex items-center justify-between rounded-xl bg-white/5 px-3.5 py-2.5 text-xs text-navy-200 transition-colors hover:text-white"
        >
          بازگشت به سایت اصلی
          <ExternalLink size={14} />
        </Link>
        <div className="flex items-center gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-bl text-[10px] font-bold text-white ${gradient}`}
          >
            {initials}
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-xs font-bold text-white">{userName}</span>
            <span className="block text-[10px] text-navy-300">{userRole}</span>
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 right-0 z-40 hidden w-64 bg-navy-950 lg:block">
        {sidebar}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 right-0 w-72 bg-navy-950 shadow-card-hover">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="lg:pe-64">
        <DashboardHeader
          onMenu={() => setOpen(true)}
          userName={userName}
          initials={initials}
          gradient={gradient}
        >
          {children}
        </DashboardHeader>
        <main className="container-app max-w-6xl py-6 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
