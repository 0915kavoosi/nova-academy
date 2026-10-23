import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Course } from "../types";
import { demoCourses } from "../data/courses";

const STORAGE_KEY = "nova-academy-courses-v1";

interface CoursesContextValue {
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (id: string, patch: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  resetCourses: () => void;
  isModified: boolean;
}

const CoursesContext = createContext<CoursesContextValue | null>(null);

function loadCourses(): Course[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return demoCourses;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return demoCourses;
    return parsed as Course[];
  } catch {
    return demoCourses;
  }
}

export function CoursesProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(loadCourses);
  const [isModified, setIsModified] = useState(
    () => window.localStorage.getItem(STORAGE_KEY) !== null,
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
    } catch {
      /* storage full or unavailable — demo continues in-memory */
    }
  }, [courses]);

  const addCourse = useCallback((course: Course) => {
    setCourses((prev) => [course, ...prev]);
    setIsModified(true);
  }, []);

  const updateCourse = useCallback((id: string, patch: Partial<Course>) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    );
    setIsModified(true);
  }, []);

  const deleteCourse = useCallback((id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    setIsModified(true);
  }, []);

  const resetCourses = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setCourses(demoCourses);
    setIsModified(false);
  }, []);

  const value = useMemo(
    () => ({ courses, addCourse, updateCourse, deleteCourse, resetCourses, isModified }),
    [courses, addCourse, updateCourse, deleteCourse, resetCourses, isModified],
  );

  return (
    <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>
  );
}

export function useCourses(): CoursesContextValue {
  const ctx = useContext(CoursesContext);
  if (!ctx) throw new Error("useCourses must be used within CoursesProvider");
  return ctx;
}
