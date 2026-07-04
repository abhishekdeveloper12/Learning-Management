# LMS SaaS - Folder Structure

This document details the backend directory structure and the responsibilities of each directory/file.

---

## 1. Directory Tree
```
backend/
├── config/
│   └── db.js                 # Database connection config
├── controllers/
│   ├── authController.js     # Admin setup, login, current profile logic
│   ├── instituteController.js # Institute CRUD handlers
│   ├── teacherController.js  # Teacher CRUD and soft deletion handlers
│   └── studentController.js  # Student CRUD and soft deletion handlers
├── middleware/
│   ├── authMiddleware.js     # JWT extraction & role authorization middleware
│   └── errorHandler.js       # Centralized error handler
├── models/
│   ├── Institute.js          # Institute schema definition
│   └── User.js               # User (Admin/Teacher/Student) schema and pre-save hooks
├── routes/
│   ├── authRoutes.js         # Authentication routes
│   ├── instituteRoutes.js    # Institute routes
│   ├── teacherRoutes.js      # Teacher routes
│   └── studentRoutes.js      # Student routes
├── utils/
│   └── generateToken.js      # JWT token generator helper
├── .env                      # Local environment variable configs
├── .gitignore                # Excluded git tracking files
├── app.js                    # Express app router registration and setups
├── package.json              # NPM manifest dependencies and run scripts
└── server.js                 # Main server startup file
```

---

## 2. Directory Responsibilities

- **`config/`**: Handles external integrations and setup adapters (e.g. database connectors).
- **`controllers/`**: Receives requests from routers, processes business flow logic, and returns formatted JSON payloads.
- **`middleware/`**: Intercepts HTTP requests for pre-processing (authentication validation, permissions, error mapping).
- **`models/`**: Defines database schema attributes, validations, indices, and mongoose helper methods.
- **`routes/`**: Handles HTTP path matching and registers route-level middlewares.
- **`utils/`**: Reusable standalone functions that keep logic DRY.
