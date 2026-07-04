# LMS SaaS - Changelog

All notable changes to this project will be documented in this file.

---

## [1.3.0] - 2026-07-04 (Day 4 Release)
### Added
- Created [studentController.js](file:///c:/Users/dice0/OneDrive/Desktop/Backend%20Development/Learning%20Management/Day4-Student%20Mangement%20&%20Enrollment%20Foundation/backend/controllers/studentController.js) holding the CRUD logic for student accounts scoped to the logged-in admin's institute, supporting soft-deletion.
- Created [studentRoutes.js](file:///c:/Users/dice0/OneDrive/Desktop/Backend%20Development/Learning%20Management/Day4-Student%20Mangement%20&%20Enrollment%20Foundation/backend/routes/studentRoutes.js) to configure protected student endpoints.

### Changed
- Modified [User.js](file:///c:/Users/dice0/OneDrive/Desktop/Backend%20Development/Learning%20Management/Day4-Student%20Mangement%20&%20Enrollment%20Foundation/backend/models/User.js) to support the `"student"` role within validation checks.
- Mounted the student router inside [app.js](file:///c:/Users/dice0/OneDrive/Desktop/Backend%20Development/Learning%20Management/Day4-Student%20Mangement%20&%20Enrollment%20Foundation/backend/app.js) under the prefix `/api/v1/students`.

---

## [1.2.0] - 2026-07-03 (Day 3 Release)
### Added
- Created [teacherController.js](file:///c:/Users/dice0/OneDrive/Desktop/Backend%20Development/Learning%20Management/Day3-Teacher%20Mangement%20&%20Role-Based%20access/backend/controllers/teacherController.js) holding the business logic for teacher CRUD (scoped to admin's institute) and soft delete deactivations.
- Created [teacherRoutes.js](file:///c:/Users/dice0/OneDrive/Desktop/Backend%20Development/Learning%20Management/Day3-Teacher%20Mangement%20&%20Role-Based%20access/backend/routes/teacherRoutes.js) to configure protected teacher endpoints.
- Implemented `restrictTo` authorization middleware inside [authMiddleware.js](file:///c:/Users/dice0/OneDrive/Desktop/Backend%20Development/Learning%20Management/Day3-Teacher%20Mangement%20&%20Role-Based%20access/backend/middleware/authMiddleware.js) to enforce role access control checks.

### Changed
- Modified [User.js](file:///c:/Users/dice0/OneDrive/Desktop/Backend%20Development/Learning%20Management/Day3-Teacher%20Mangement%20&%20Role-Based%20access/backend/models/User.js) to support the `"teacher"` role within the validation enum.
- Simplified Mongoose pre-save password hashing hook inside [User.js](file:///c:/Users/dice0/OneDrive/Desktop/Backend%20Development/Learning%20Management/Day3-Teacher%20Mangement%20&%20Role-Based%20access/backend/models/User.js) to prevent Kareem async callback conflict issues.
- Updated route file imports ([authRoutes.js](file:///c:/Users/dice0/OneDrive/Desktop/Backend%20Development/Learning%20Management/Day3-Teacher%20Mangement%20&%20Role-Based%20access/backend/routes/authRoutes.js) and [instituteRoutes.js](file:///c:/Users/dice0/OneDrive/Desktop/Backend%20Development/Learning%20Management/Day3-Teacher%20Mangement%20&%20Role-Based%20access/backend/routes/instituteRoutes.js)) to accommodate destructured exports from `authMiddleware.js`.
- Mounted teacher router inside [app.js](file:///c:/Users/dice0/OneDrive/Desktop/Backend%20Development/Learning%20Management/Day3-Teacher%20Mangement%20&%20Role-Based%20access/backend/app.js) under the path prefix `/api/v1/teachers`.

---

## [1.1.0] - 2026-06-27 (Day 2 Release)
### Added
- Created Mongoose User model representing administration accounts.
- Added bcrypt password encryption pre-save validation hooks.
- Created setup admin and login controller actions.
- Created JWT generation helper utility and route protection middleware.
- Mounted authentication routes under `/api/v1/auth`.

---

## [1.0.0] - 2026-06-26 (Day 1 Release)
### Added
- Configured Express application bootstrap skeleton and Mongoose DB connectors.
- Created Mongoose schema and validations for the Institute model.
- Developed basic Institute CRUD controllers and routes.
- Created centralized JSON error handling middleware.
