import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap, LayoutDashboard } from "lucide-react";
import Button from "../ui/Button";

const navItems = [
  { to: "/", label: "خانه" },
  { to: "/courses", label: "دوره‌ها" },
  { to: "/dashboard", label: "داشبورد دانشجو" },
];

const Logo = () => (
  <Link to="/" className="flex items-center gap-2.5" aria-label="آکادمی نُوا — صفحه اصلی">
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 shadow-sm">
      <GraduationCap size={22} className="text-royal-300" />
    </span>
    <span className="leading-tight">
      <span className="block text-base font-black text-navy-900">آکادمی نُوا</span>
      <span className="block text-[10px] font-medium text-slate-400">
        NOVA Academy
      </span>
    </span>
  </Link>
);

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="container-app flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex" aria-label="منوی اصلی">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-royal-50 text-royal-700"
                      : "text-slate-600 hover:text-navy-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link to="/admin">
              <Button variant="outline" size="sm">
                <LayoutDashboard size={15} />
                پنل مدیریت
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm">ورود به داشبورد</Button>
            </Link>
          </div>

          <button
            className="cursor-pointer rounded-lg p-2 text-navy-800 hover:bg-slate-100 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <nav
            className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 md:hidden"
            aria-label="منوی موبایل"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `rounded-lg px-3.5 py-2.5 text-sm font-medium ${
                      isActive ? "bg-royal-50 text-royal-700" : "text-slate-600"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
              <Link to="/admin">
                <Button variant="outline" size="sm" className="w-full">
                  پنل مدیریت
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="sm" className="w-full">
                  ورود به داشبورد
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-16 bg-navy-950 text-navy-100">
        <div className="container-app grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <GraduationCap size={22} className="text-royal-300" />
              </span>
              <span className="leading-tight">
                <span className="block text-base font-black text-white">آکادمی نُوا</span>
                <span className="block text-[10px] text-navy-400">NOVA Academy</span>
              </span>
            </div>
            <p className="text-sm leading-7 text-navy-200">
              پلتفرم آموزش آنلاین برای ساختن مسیر شغلی حرفه‌ای با دوره‌های کاربردی و
              پروژه‌محور. این وب‌سایت یک نمونه‌کار نمایشی است.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">دسترسی سریع</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {[
                { to: "/", label: "صفحه اصلی" },
                { to: "/courses", label: "لیست دوره‌ها" },
                { to: "/dashboard", label: "داشبورد دانشجو" },
                { to: "/admin", label: "پنل مدیریت" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-navy-200 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">دسته‌بندی‌های محبوب</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {["برنامه‌نویسی", "طراحی وب", "طراحی رابط کاربری", "بازاریابی دیجیتال"].map(
                (name) => (
                  <li key={name}>
                    <Link
                      to={`/courses?category=${encodeURIComponent(name)}`}
                      className="text-navy-200 transition-colors hover:text-white"
                    >
                      {name}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">تماس با ما</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-navy-200">
              <li>نشانی: تهران، خیابان نمونه، ساختمان نُوا</li>
              <li>ایمیل: info@nova-academy-demo.ir</li>
              <li>تلفن: ۰۲۱ −۸۸۰۰۱۲۳۴</li>
            </ul>
            <p className="mt-4 text-xs text-navy-400">
              اطلاعات تماس و داده‌های این سایت همگی نمایشی هستند.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 py-5">
          <p className="container-app text-center text-xs text-navy-400">
            © ۱۴۰۵ آکادمی نُوا — تمام محتوای این وب‌سایت نمایشی است (نسخه دمو).
          </p>
        </div>
      </footer>
    </div>
  );
}
