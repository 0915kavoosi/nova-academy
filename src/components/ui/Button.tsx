import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "white";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-royal-600 text-white shadow-sm hover:bg-royal-700 focus-visible:ring-royal-500/40",
  secondary:
    "bg-navy-800 text-white shadow-sm hover:bg-navy-900 focus-visible:ring-navy-700/40",
  outline:
    "border border-slate-300 bg-white text-navy-800 hover:border-royal-400 hover:text-royal-700 focus-visible:ring-royal-500/30",
  ghost: "text-navy-700 hover:bg-slate-100 focus-visible:ring-slate-400/40",
  danger: "bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-500/40",
  white:
    "bg-white text-navy-800 shadow-sm hover:bg-slate-100 focus-visible:ring-white/50",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className = "", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`inline-flex cursor-pointer select-none items-center justify-center rounded-lg font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-60 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
});

export default Button;
