import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export function TextField({
  label,
  error,
  hint,
  required,
  ...props
}: BaseFieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="label-base">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <input
        className={`input-base ${error ? "input-error" : ""}`}
        aria-invalid={!!error}
        {...props}
      />
      {error ? (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-slate-400">{hint}</span>
      ) : null}
    </label>
  );
}

export function SelectField({
  label,
  error,
  children,
  required,
  ...props
}: BaseFieldProps &
  SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <label className="block">
      <span className="label-base">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <select
        className={`input-base ${error ? "input-error" : ""}`}
        aria-invalid={!!error}
        {...props}
      >
        {children}
      </select>
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

export function TextareaField({
  label,
  error,
  required,
  ...props
}: BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block">
      <span className="label-base">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <textarea
        className={`input-base min-h-24 resize-y ${error ? "input-error" : ""}`}
        aria-invalid={!!error}
        {...props}
      />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
