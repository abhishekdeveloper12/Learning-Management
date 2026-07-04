# LMS SaaS - Database Design

This document details the database schema, field types, validations, and references for the MongoDB database.

## 1. Collections Overview

The application utilizes two primary collections:
1. **institutes**: Stores information about the school/academy/institute.
2. **users**: A unified collection for all user profiles (Admins, Teachers, and future roles like Students).

---

## 2. Institute Collection Schema (`institutes`)

| Field | Type | Required | Unique | Default | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Yes | Yes | Auto-gen | Primary Key |
| `instituteName` | String | Yes | No | - | Name of the institute |
| `instituteCode` | String | Yes | Yes | - | Alphanumeric abbreviation |
| `email` | String | Yes | Yes | - | Primary contact email |
| `phone` | String | Yes | No | - | Contact phone number |
| `website` | String | No | No | `""` | Optional website URL |
| `ownerName` | String | Yes | No | - | Owner/Founder name |
| `address` | Object | Yes | No | - | Sub-document (see below) |
| `logo` | String | No | No | `""` | Logo URL or path |
| `status` | String | Yes | No | `"active"` | Enum: `["active", "inactive", "suspended"]` |
| `subscriptionPlan`| String | Yes | No | `"free"` | Enum: `["free", "basic", "premium"]` |
| `maxStudents` | Number | Yes | No | `0` | Upper limit of student seats |
| `maxTeachers` | Number | Yes | No | `0` | Upper limit of teacher seats |
| `subscriptionExpiry`| Date | No | No | `null` | Subscription expiration timestamp |
| `createdAt` | Date | Yes | No | Auto-gen | Timestamp |
| `updatedAt` | Date | Yes | No | Auto-gen | Timestamp |

### Address Sub-Document Schema
- `country` (String, required)
- `state` (String, required)
- `city` (String, required)
- `pincode` (String, required)
- `fullAddress` (String, required)

---

## 3. User Collection Schema (`users`)

All user types (Admins, Teachers, and Students) reside inside this single collection.

| Field | Type | Required | Unique | Default | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Yes | Yes | Auto-gen | Primary Key |
| `fullName` | String | Yes | No | - | User's full name |
| `email` | String | Yes | Yes | - | User's login email (lowercase) |
| `password` | String | Yes | No | - | Hashed password (bcrypt) |
| `phone` | String | Yes | No | - | Contact phone number |
| `role` | String | Yes | No | `"admin"` | Enum: `["admin", "teacher", "student"]` |
| `institute` | ObjectId | Yes | No | - | Reference to `institutes._id` |
| `profileImage` | String | No | No | `""` | URL of profile picture |
| `isActive` | Boolean | Yes | No | `true` | Account status (used for soft delete) |
| `lastLogin` | Date | No | No | `null` | Last successful login timestamp |
| `createdAt` | Date | Yes | No | Auto-gen | Timestamp |
| `updatedAt` | Date | Yes | No | Auto-gen | Timestamp |
