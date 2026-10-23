import type { Course } from "../types";
import { instructorById } from "../data/instructors";
import { categoryById } from "../data/categories";
import { levelLabels, formatPrice, formatNumber, toFa } from "../lib/format";
import AppIcon from "./ui/AppIcon";
import StarRating from "./ui/StarRating";
import Badge from "./ui/Badge";
import { Clock, GraduationCap, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export function CourseThumb({
  course,
  className = "",
  iconSize = 40,
}: {
  course: Course;
  className?: string;
  iconSize?: number;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-bl ${course.gradient} ${className}`}
      aria-hidden="true"
    >
      <div className="absolute -left-8 -top-10 h-28 w-28 rounded-full bg-white/10" />
      <div className="absolute -bottom-12 -right-6 h-32 w-32 rounded-full bg-white/10" />
      <AppIcon name={course.icon} size={iconSize} className="relative text-white/90" />
    </div>
  );
}

export default function CourseCard({ course }: { course: Course }) {
  const instructor = instructorById[course.instructorId];
  const category = categoryById[course.categoryId];

  return (
    <Link
      to={`/courses/${course.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
      aria-label={`مشاهده دوره ${course.title}`}
    >
      <div className="relative">
        <CourseThumb course={course} className="h-40 w-full" />
        <span className="absolute right-3 top-3">
          <Badge tone="royal" className="shadow-sm">
            {category.name}
          </Badge>
        </span>
        {!course.published && (
          <span className="absolute left-3 top-3">
            <Badge tone="slate" className="shadow-sm">
              پیش‌نویس
            </Badge>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <Badge tone={course.level === "advanced" ? "amber" : course.level === "intermediate" ? "sky" : "green"}>
            {levelLabels[course.level]}
          </Badge>
          <StarRating rating={course.rating} />
        </div>

        <h3 className="line-clamp-2 text-base font-black leading-7 text-navy-900 transition-colors group-hover:text-royal-700">
          {course.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-6 text-slate-500">
          {course.shortDescription}
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <span className="flex items-center gap-2 text-xs text-slate-500">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-bl text-[9px] font-bold text-white ${instructor.gradient}`}
            >
              {instructor.initials}
            </span>
            {instructor.name}
          </span>
          <div className="flex items-center gap-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock size={14} className="text-royal-500" />
              {toFa(course.durationHours)} ساعت
            </span>
            <span className="flex items-center gap-1">
              <BookOpen size={14} className="text-royal-500" />
              {toFa(course.lessonCount)} درس
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} className="text-royal-500" />
              {formatNumber(course.studentCount)}
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              {course.oldPrice && (
                <span className="me-2 text-xs text-slate-400 line-through">
                  {formatPrice(course.oldPrice)}
                </span>
              )}
              <span className="text-base font-black text-navy-900">
                {formatPrice(course.price)}
              </span>
            </div>
            <GraduationCap size={20} className="text-royal-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}
