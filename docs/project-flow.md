# LMS SaaS - Project Flow

This document details the logical sequencing of key business processes within the Multi-Tenant Learning Management System (LMS SaaS).

---

## 1. Initial Setup Flow (Day 1)
```
1. Client requests registration of a new school/academy.
   POST /api/v1/institutes
        ↓
2. Server validates name, code, email, etc.
        ↓
3. Mongoose writes the institute to MongoDB.
        ↓
4. Returns the generated institute ID to the client.
```

---

## 2. Administrator Enrollment Flow (Day 2)
```
1. Client requests to setup an administrator for the newly created institute.
   POST /api/v1/auth/setup-admin
        ↓
2. Server checks if the email is already registered and checks if the institute ID exists.
        ↓
3. Password is automatically hashed with bcrypt using Mongoose pre-save middleware.
        ↓
4. User record is created with role "admin".
        ↓
5. Server returns a success response.
```

---

## 3. Login & Authentication Flow (Day 2 & Day 3)
```
1. User (Admin or Teacher) requests login.
   POST /api/v1/auth/login
        ↓
2. Server finds user by email.
        ↓
3. Compares password hashes using bcrypt.compare().
        ↓
4. Generates a signed JWT containing { userId, role, instituteId }.
        ↓
5. Updates the user's lastLogin timestamp in MongoDB.
        ↓
6. Returns user details and the JWT token to the client.
```

---

## 4. Teacher Management Flow (Day 3)
```
1. Admin makes a request to create a teacher.
   POST /api/v1/teachers (Body: fullName, email, password, phone, profileImage)
        ↓
2. authMiddleware checks for Bearer JWT token in headers, decodes, and attaches payload to req.user.
        ↓
3. restrictTo("admin") intercepts and verifies the user's role is "admin".
        ↓
4. Controller checks if the email is already in use.
        ↓
5. Password is automatically hashed using pre-save middleware.
        ↓
6. Teacher is created with role "teacher", isActive = true, and institute = req.user.instituteId.
        ↓
7. Server returns the teacher details (excluding password).
```

---

## 5. Deactivation (Soft Delete) Flow (Day 3)
```
1. Admin requests to delete a teacher.
   DELETE /api/v1/teachers/:id
        ↓
2. Middleware chain validates JWT token and verifies user role is "admin".
        ↓
3. Controller verifies teacher exists and belongs to the admin's institute.
        ↓
4. Performs findByIdAndUpdate to set isActive = false.
        ↓
5. Subsequent GET requests exclude teachers with isActive = false.
```

---

## 6. Student Management Flow (Day 4)
```
1. Admin makes a request to create a student.
   POST /api/v1/students (Body: fullName, email, password, phone, profileImage)
        ↓
2. authMiddleware checks for Bearer JWT token in headers, decodes, and attaches payload to req.user.
        ↓
3. restrictTo("admin") intercepts and verifies the user's role is "admin".
        ↓
4. Controller checks if the email is already in use.
        ↓
5. Password is automatically hashed using pre-save middleware.
        ↓
6. Student is created with role "student", isActive = true, and institute = req.user.instituteId.
        ↓
7. Server returns the student details (excluding password).
```

---

## 7. Student Deactivation (Soft Delete) Flow (Day 4)
```
1. Admin requests to deactivate a student.
   DELETE /api/v1/students/:id
        ↓
2. Middleware chain validates JWT token and verifies user role is "admin".
        ↓
3. Controller verifies student exists and belongs to the admin's institute.
        ↓
4. Performs findByIdAndUpdate to set isActive = false.
        ↓
5. Subsequent GET requests exclude students with isActive = false.
```
