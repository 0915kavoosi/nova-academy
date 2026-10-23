export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface CourseLesson {
  title: string;
  duration: string;
  free?: boolean;
}

export interface CourseSection {
  title: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  instructorId: string;
  categoryId: string;
  price: number;
  oldPrice?: number;
  durationHours: number;
  lessonCount: number;
  studentCount: number;
  level: CourseLevel;
  rating: number;
  gradient: string;
  icon: string;
  shortDescription: string;
  description: string;
  syllabus: CourseSection[];
  published: boolean;
  createdAt: string;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  initials: string;
  gradient: string;
  bio: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  initials: string;
  gradient: string;
  text: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: "active" | "inactive";
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  progress: number;
  status: "active" | "completed" | "cancelled";
}
