# Authenticator & Authorization Tool

A production-grade authentication and authorization backend built with **TypeScript**, **Express**, and **MongoDB**, designed with clean architecture, security-first thinking, and long-term reusability in mind.

> This project is intended as a **professional backend foundation** that can be reused across future projects and deployed in real production environments.

---

## 📌 Project Overview

Authentication systems are deceptively complex. Beyond basic login and registration, a robust system must handle:

- Secure credential storage
- Token lifecycle management
- Account protection against abuse
- Password recovery and verification
- Clean error handling
- Maintainable architecture

This project implements a **complete, real-world authentication backend**, intentionally designed to be extended, reused, and production-hardened over time.

---

## 🧱 Architecture Overview

The system follows a **layered architecture** with strict separation of concerns:


### Layers Explained

- **Routes**
  - Define HTTP endpoints
  - Attach middleware
- **Controllers**
  - Handle HTTP request/response
  - No business logic
- **Services**
  - Core authentication logic
  - Security rules and workflows
- **Repositories**
  - All database access
  - No business logic
- **Models**
  - Schema definitions and lifecycle hooks
- **Middlewares**
  - Authentication, authorization, error handling

This structure mirrors real production backends and enables maintainability, testability, and long-term evolution.

---

## 📐 Architecture Diagram

            ┌─────────────────────┐
            │      Client         │
            │ (Postman / Frontend)│
            └─────────┬───────────┘
                      │ HTTP Requests
                      ▼
            ┌─────────────────────┐
            │       Routes        │
            │  (Express Router)   │
            └─────────┬───────────┘
                      │
                      ▼
            ┌─────────────────────┐
            │     Controllers     │
            │ (Request / Response)│
            └─────────┬───────────┘
                      │
                      ▼
            ┌─────────────────────┐
            │      Services       │
            │ (Auth Logic &       │
            │  Security Rules)    │
            └─────────┬───────────┘
                      │
                      ▼
            ┌─────────────────────┐
            │    Repositories     │
            │ (Database Access)   │
            └─────────┬───────────┘
                      │
                      ▼
            ┌─────────────────────┐
            │      MongoDB        │
            │   (Users, Tokens)   │
            └─────────────────────┘


---

## 🔐 Authentication & Authorization Features

### ✅ User Registration
- Email uniqueness enforced
- Passwords hashed using bcrypt
- Input validation with Zod

### ✅ Login
- Secure password comparison
- JWT access token issuance
- Account lockout on repeated failures

### ✅ JWT-Based Authorization
- Stateless access tokens
- Middleware-based route protection
- Role-based access control (RBAC)

### ✅ Refresh Token Flow
- Long-lived refresh tokens
- Rotation on use
- Server-side storage and revocation

### ✅ Password Reset
- One-time reset tokens
- Tokens hashed before storage
- Expiry enforced
- Password re-hash on reset

### ✅ Email Verification
- Secure verification tokens
- Token hashing and expiry
- Email verification state tracked in database

---

## 🛡️ Security Design Decisions

This project explicitly prioritizes security:

- **Password Hashing**
  - bcrypt with strong cost factor
  - No plaintext passwords stored

- **Token Security**
  - Reset and verification tokens hashed before storage
  - Database leaks do not expose usable tokens

- **Account Protection**
  - Failed login attempt tracking
  - Temporary account lockout

- **JWT Strategy**
  - Short-lived access tokens
  - Refresh tokens stored and revocable

- **Error Handling**
  - Centralized JSON error handling
  - No sensitive data leaked to clients

---

## ⚙️ Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT
- **Validation:** Zod
- **Security:** bcrypt
- **Logging:** Winston

---

## 🚀 Running the Project Locally

### 1️⃣ Install dependencies
```bash
npm install
