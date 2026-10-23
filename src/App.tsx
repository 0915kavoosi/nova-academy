import { Routes, Route } from "react-router-dom";
import { CoursesProvider } from "./context/CoursesContext";
import { ToastProvider } from "./components/ui/Toast";
import PublicLayout from "./components/layout/PublicLayout";
import StudentLayout from "./components/layout/StudentLayout";
import AdminLayout from "./components/layout/AdminLayout";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import StudentOverview from "./pages/student/StudentOverview";
import StudentProfile from "./pages/student/StudentProfile";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminEnrollments from "./pages/admin/AdminEnrollments";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <ToastProvider>
      <CoursesProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="/dashboard" element={<StudentLayout />}>
            <Route index element={<StudentOverview />} />
            <Route path="profile" element={<StudentProfile />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="enrollments" element={<AdminEnrollments />} />
          </Route>
        </Routes>
      </CoursesProvider>
    </ToastProvider>
  );
}
