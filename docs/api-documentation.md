# LMS SaaS - API Documentation

This document outlines the API endpoints, methods, parameters, and responses for the LMS SaaS backend.

## 1. Base URL
- Local: `http://127.0.0.1:5000/api/v1`

---

## 2. Institute Module Endpoints

### 1. Register Institute (Unprotected)
- **POST** `/institutes`
- **Body**:
```json
{
  "instituteName": "Day 3 Academy",
  "instituteCode": "DAY3ACADEMY",
  "email": "contact@day3.edu",
  "phone": "1234567890",
  "ownerName": "Alice Vance",
  "address": {
    "country": "India",
    "state": "Delhi",
    "city": "Delhi",
    "pincode": "110001",
    "fullAddress": "123 Testing St"
  }
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "Institute registered successfully",
  "data": { ... }
}
```

### 2. Get All Institutes (Unprotected)
- **GET** `/institutes`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Institutes fetched successfully",
  "data": [ ... ]
}
```

### 3. Update Institute (Protected - Admin Only)
- **PATCH** `/institutes/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Institute updated successfully",
  "data": { ... }
}
```

---

## 3. Authentication Endpoints

### 1. Setup Admin (Unprotected)
- **POST** `/auth/setup-admin`
- **Body**:
```json
{
  "fullName": "Academy Admin",
  "email": "admin@day3.edu",
  "password": "password123",
  "phone": "9876543210",
  "institute": "6a4762b2ce30652e71776771"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "Admin registered successfully",
  "data": { ... }
}
```

### 2. Login (Unprotected)
- **POST** `/auth/login`
- **Body**:
```json
{
  "email": "admin@day3.edu",
  "password": "password123"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Get Current User (Protected)
- **GET** `/auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Current user fetched successfully",
  "data": { ... }
}
```

---

## 4. Teacher Module Endpoints (All Protected - Admin Only)

### 1. Create Teacher
- **POST** `/teachers`
- **Headers**: `Authorization: Bearer <token>` (Admin Only)
- **Body**:
```json
{
  "fullName": "Professor Snape",
  "email": "teacher@day3.edu",
  "password": "potionspassword",
  "phone": "5551234567",
  "profileImage": "https://day3.edu/snape.png"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "Teacher created successfully",
  "data": {
    "id": "6a4762dfe225820f8d5d5030",
    "fullName": "Professor Snape",
    "email": "teacher@day3.edu",
    "role": "teacher",
    "institute": "6a4762dfe225820f8d5d502e",
    "isActive": true
  }
}
```

### 2. Get All Teachers (Logged-in admin's institute only)
- **GET** `/teachers`
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Teachers fetched successfully",
  "data": [ ... ]
}
```

### 3. Get Single Teacher
- **GET** `/teachers/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Teacher details fetched successfully",
  "data": { ... }
}
```

### 4. Update Teacher
- **PATCH** `/teachers/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Any field to update (e.g. `fullName`, `phone`, `email`).
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Teacher updated successfully",
  "data": { ... }
}
```

### 5. Soft Delete Teacher (Deactivate)
- **DELETE** `/teachers/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Teacher deactivated successfully",
  "data": null
}
```

---

## 5. Student Module Endpoints (All Protected - Admin Only)

### 1. Create Student
- **POST** `/students`
- **Headers**: `Authorization: Bearer <token>` (Admin Only)
- **Body**:
```json
{
  "fullName": "Harry Potter",
  "email": "student@day4.edu",
  "password": "quidditchpassword",
  "phone": "5557778888",
  "profileImage": "https://day4.edu/harry.png"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "id": "6a48e13ebd9fda0d3c454bec",
    "fullName": "Harry Potter",
    "email": "student@day4.edu",
    "role": "student",
    "institute": "6a48e13ebd9fda0d3c454bea",
    "isActive": true
  }
}
```

### 2. Get All Students (Logged-in admin's institute only)
- **GET** `/students`
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Students fetched successfully",
  "data": [ ... ]
}
```

### 3. Get Single Student
- **GET** `/students/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Student details fetched successfully",
  "data": { ... }
}
```

### 4. Update Student
- **PATCH** `/students/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Any field to update (e.g. `fullName`, `phone`, `email`).
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": { ... }
}
```

### 5. Soft Delete Student (Deactivate)
- **DELETE** `/students/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Student deactivated successfully",
  "data": null
}
```
