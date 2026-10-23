import type { ReactNode } from "react";
import { Menu } from "lucide-react";
import DemoBadge from "../DemoBadge";

export default function DashboardHeader({
  onMenu,
  userName,
  initials,
  gradient,
  children,
}: {
  onMenu: () => void;
  userName: string;
  initials: string;
  gradient: string;
  children?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            className="cursor-pointer rounded-lg p-2 text-navy-800 hover:bg-slate-100 lg:hidden"
            onClick={onMenu}
            aria-label="باز کردن منو"
          >
            <Menu size={22} />
          </button>
          {children ?? (
            <p className="text-sm text-slate-500">
              خوش آمدید، <span className="font-bold text-navy-900">{userName}</span>
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <DemoBadge className="hidden sm:inline-flex" />
          <span className="hidden text-sm font-medium text-navy-800 md:block">
            {userName}
          </span>
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-bl text-[10px] font-bold text-white ${gradient}`}
          >
            {initials}
          </span>
        </div>
      </div>
    </header>
  );
}
