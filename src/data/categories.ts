import type { Category } from "../types";

export const categories: Category[] = [
  { id: "programming", name: "برنامه‌نویسی", icon: "code", color: "royal" },
  { id: "web", name: "طراحی وب", icon: "globe", color: "sky" },
  { id: "uiux", name: "طراحی رابط کاربری", icon: "palette", color: "indigo" },
  { id: "marketing", name: "دیجیتال مارکتینگ", icon: "megaphone", color: "blue" },
  { id: "seo", name: "سئو", icon: "search", color: "navy" },
  { id: "data", name: "تحلیل داده", icon: "chart", color: "royal" },
];

export const categoryById = Object.fromEntries(
  categories.map((c) => [c.id, c]),
) as Record<string, Category>;
