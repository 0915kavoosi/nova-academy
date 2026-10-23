const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toFa(value: number | string): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

export function formatNumber(value: number): string {
  return toFa(value.toLocaleString("en-US"));
}

export function formatPrice(value: number): string {
  if (value === 0) return "رایگان";
  return `${formatNumber(value)} تومان`;
}

export function formatFaDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export const levelLabels: Record<string, string> = {
  beginner: "مقدماتی",
  intermediate: "متوسط",
  advanced: "پیشرفته",
};

export const enrollmentStatusLabels: Record<string, string> = {
  active: "در حال یادگیری",
  completed: "تکمیل شده",
  cancelled: "لغو شده",
};

export const studentStatusLabels: Record<string, string> = {
  active: "فعال",
  inactive: "غیرفعال",
};
