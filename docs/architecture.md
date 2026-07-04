# LMS SaaS - System Architecture

This document describes the high-level system architecture of the Multi-Tenant Learning Management System (LMS SaaS).

## 1. High-Level Architecture Pattern
The project is built on the **Model-View-Controller (MVC)** design pattern, modified for API development (where views are represented by JSON payloads returned to the client).

```
[ Client Request (Postman/Frontend) ]
                 ↓
      [ Express Routing Layer ]
                 ↓
      [ Middleware Pipeline ] (Token Verification & Role Access Checks)
                 ↓
     [ Controllers (CRUD/Auth) ] (Contains business flow/logic)
                 ↓
   [ Models (Mongoose Schema) ] (Interfaces with MongoDB)
                 ↓
         [ MongoDB Atlas ]
```

## 2. Component Design

### Routing Layer
Responsible for receiving incoming HTTP requests and mapping them to their corresponding controller actions.
- `/api/v1/institutes` -> Maps to Institute CRUD.
- `/api/v1/auth` -> Maps to authentication routes (admin registration, login, profile retrieval).
- `/api/v1/teachers` -> Maps to Teacher CRUD.
- `/api/v1/students` -> Maps to Student CRUD.

### Middleware Pipeline
Secures endpoints and formats operational errors:
1. **CORS / Parsers**: Configures cross-origin requests and JSON/URL-encoded body decoding.
2. **Authentication Middleware (`authMiddleware`)**: Validates the Bearer token in the `Authorization` header and assigns decoded user payloads (`userId`, `role`, `instituteId`) to `req.user`.
3. **Role Authorization Middleware (`restrictTo`)**: Assures that the logged-in user holds the required roles (e.g. `'admin'`) to perform administrative functions.
4. **Error Handler Middleware (`errorHandler`)**: Catches all downstream errors passed to `next()` and formats consistent JSON error responses.

### Controllers
Executes database logic, handles request validation, and builds HTTP responses. Follows a procedural, human-readable coding style.

### Models & Database
Interacts with the single MongoDB instance using Mongoose. The system stores user records (Admins, Teachers, and Students) inside a single `users` collection to keep schema management simple and easily expandable.
