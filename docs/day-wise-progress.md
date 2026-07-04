# LMS SaaS - Day-Wise Progress Log

This document records the incremental development milestones achieved on each day of building the Multi-Tenant Learning Management System (LMS SaaS).

---

## Day 1: Project Foundation & Institute CRUD
- **Objective**: Establish the base codebase structure and create the institute entity.
- **Key Achievements**:
  - Structured Node/Express codebase under MVC guidelines.
  - Setup database connection adapter using Mongoose.
  - Implemented Mongoose model validation rules for Institutes.
  - Created Institute CRUD controller actions and endpoints (`POST`, `GET`, `GET :id`, `PATCH`, `DELETE`).
  - Added centralized error handler middleware.

---

## Day 2: Authentication & JWT
- **Objective**: Implement secure tenant administration enrollment and auth workflows.
- **Key Achievements**:
  - Implemented the `users` Mongoose model representing administration users.
  - Configured password encryption flows using `bcrypt` pre-save hooks.
  - Created setup admin and credential verification endpoints.
  - Implemented reusable JWT generation utility.
  - Created `authMiddleware` to secure routes using bearer tokens.
  - Protected update/delete institute endpoints, leaving create/retrieve public.

---

## Day 3: Teacher Management & Role-Based Access Control (RBAC)
- **Objective**: Expand the user directory to support teacher accounts under role protection.
- **Key Achievements**:
  - Extended the `User` schema enum to support the `"teacher"` role.
  - Modified the password pre-save hooks inside `models/User.js` to run warning-free in modern Mongoose versions.
  - Created `teacherController.js` carrying out CRUD processes restricted to the logged-in admin's institute, supporting soft-deletes (`isActive = false`).
  - Extended `authMiddleware.js` to export a role-restricting checkpoint (`restrictTo`).
  - Configured protected route paths in `routes/teacherRoutes.js` and registered them under `app.js`.

---

## Day 4: Student Management Module
- **Objective**: Establish student enrollment accounts under role-based control boundaries.
- **Key Achievements**:
  - Extended the Mongoose `User` schema enum to support the `"student"` role.
  - Created [studentController.js](file:///c:/Users/dice0/OneDrive/Desktop/Backend%20Development/Learning%20Management/Day4-Student%20Mangement%20&%20Enrollment%20Foundation/backend/controllers/studentController.js) implementing student CRUD actions scope-restricted to the logged-in admin's institute, with soft-deletion.
  - Created [studentRoutes.js](file:///c:/Users/dice0/OneDrive/Desktop/Backend%20Development/Learning%20Management/Day4-Student%20Mangement%20&%20Enrollment%20Foundation/backend/routes/studentRoutes.js) to register and protect student CRUD operations.
  - Mounted the student router inside [app.js](file:///c:/Users/dice0/OneDrive/Desktop/Backend%20Development/Learning%20Management/Day4-Student%20Mangement%20&%20Enrollment%20Foundation/backend/app.js) under `/api/v1/students`.
  - Re-used login, authentication, and JWT features to enable teacher/student authentication.
