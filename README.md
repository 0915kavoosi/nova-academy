link :
    https://0915kavoosi.github.io/nova-academy/



You are a senior full-stack developer, UI/UX designer,
and software architect.

Your task is to build a polished, professional Persian
e-learning academy website that will be presented as a
portfolio demo to a potential freelance client.

PROJECT NAME:
NOVA Academy | آکادمی نُوا

IMPORTANT:
This is an existing or potentially existing codebase.
Inspect the project before making changes.
Do not delete existing files or overwrite unrelated work.
Preserve the current project architecture when practical.

==================================================
1. DESIGN DIRECTION
==================================================

Create a premium, modern educational platform.

Visual style:
- Modern SaaS dashboard aesthetics
- Elegant and minimal layout
- Persian RTL interface
- Persian typography using Vazirmatn
- Navy blue, royal blue, white, and subtle neutral colors
- Generous whitespace
- Beautiful cards and consistent spacing
- Subtle shadows and transitions
- Responsive desktop, tablet, and mobile layouts
- Professional icons
- Attractive charts and dashboard components

Avoid:
- Generic template appearance
- Excessive gradients
- Excessive animations
- Unnecessary decorative elements
- Broken layouts
- Fake functionality presented as production-ready

The website must feel like a real commercial product.

==================================================
2. TECHNICAL REQUIREMENTS
==================================================

First inspect the existing project and identify:
- Framework
- Package manager
- Existing dependencies
- Current routes
- Existing components
- Development commands

If the repository is empty, use:
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React icons

Use compatible versions and follow the conventions
of the existing codebase.

Do not replace the framework unnecessarily.

Use reusable components and a clean project structure.

==================================================
3. MAIN WEBSITE
==================================================

Build a complete Persian homepage with:

- Professional navigation bar
- Academy logo and branding
- Hero section with a strong headline
- Search courses input
- Primary and secondary call-to-action buttons
- Academy statistics using clearly labeled demo data
- Popular courses section
- Course categories
- Instructor profiles
- Student testimonials labeled as sample content
- Benefits of learning with the academy
- FAQ accordion
- Professional footer

Suggested headline:

"مسیر یادگیری حرفه‌ای خودت رو بساز"

Suggested subtitle:

"با دوره‌های کاربردی، مهارت‌های جدید یاد بگیر
و قدم بعدی مسیر شغلی‌ات رو محکم‌تر بردار."

The homepage must immediately communicate quality
and professionalism.

==================================================
4. COURSE CATALOG
==================================================

Create a functional course listing page.

Features:
- Course cards with attractive thumbnails
- Course title
- Instructor
- Price
- Duration
- Student count using sample data
- Course category
- Search functionality
- Category filtering
- Sorting by price
- Course detail pages
- Course syllabus
- Course description
- Instructor information
- Enrollment call to action

Use realistic sample courses such as:
- آموزش جامع طراحی وب
- برنامه‌نویسی پایتون
- طراحی رابط کاربری با Figma
- آموزش React و TypeScript
- بازاریابی دیجیتال
- آموزش سئو

Do not copy branding from another business.

==================================================
5. STUDENT DASHBOARD
==================================================

Create a separate student dashboard with:

- Overview cards
- Enrolled courses
- Course progress indicators
- Upcoming classes
- Learning activity
- Profile information
- Notification section

Use sample data.

Clearly distinguish demo authentication from real
authentication.

==================================================
6. ADMIN DASHBOARD
==================================================

Build a professional academy management dashboard.
Include:
- Sidebar navigation
- Dashboard overview
- Total students
- Total courses
- Enrollment statistics
- Sample revenue statistics
- Charts for enrollment trends
- Course management table
- Student management table
- Enrollment management
- Search and filtering
- Add course form
- Edit course form
- Delete course confirmation dialog

Course management must work within the demo application.

Use persistent browser storage when appropriate.

Display a clear confirmation before destructive actions.

All sample financial figures must be labeled as demo data.

==================================================
7. FUNCTIONAL REQUIREMENTS
==================================================

Do not build a static mockup only.

Implement working interactions:
- Navigation
- Search
- Filters
- Sorting
- FAQ accordion
- Course details navigation
- Form validation
- Success and error messages
- Add course
- Edit course
- Delete course
- Responsive mobile menu

Persist demo course changes using localStorage
if suitable for the existing architecture.

Do not claim that a real payment gateway,
real authentication, or backend exists unless
it is actually implemented.

If there is no backend, explain that the dashboards
use demonstration data.

Avoid dead buttons and links.

==================================================
8. DESIGN QUALITY
==================================================

Pay special attention to:
- Persian typography
- RTL layout correctness
- Consistent component spacing
- Accessible contrast
- Loading and empty states
- Form validation states
- Responsive tables
- Mobile navigation
- Visual hierarchy

Make the homepage visually impressive enough
to serve as a freelance portfolio presentation.

==================================================
9. IMPLEMENTATION WORKFLOW
==================================================

Follow these steps:

1. Inspect the repository.
2. Identify the existing framework and dependencies.
3. Create an implementation plan.
4. Implement the core application.
5. Implement course catalog and detail pages.
6. Implement student and admin dashboards.
7. Add functional interactions.
8. Run the available development checks.
9. Run the production build.
10. Fix errors caused by the implementation.
11. Review responsive behavior and RTL layout.
12. Summarize completed features and remaining limitations.

Do not stop after writing a plan.

Proceed with implementation.

Do not rewrite unrelated files.
Do not remove existing functionality without a clear reason.
Do not claim tests passed unless they were actually run.

At the end, explain:
- What was implemented
- How to run the application
- Which features are functional
- Which features are demo-only
- What remains before production deployment