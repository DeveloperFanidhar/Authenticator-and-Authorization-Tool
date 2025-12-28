# Authenticator & Authorization Tool

A production-grade authentication and authorization backend built with **TypeScript**, **Express**, and **MongoDB**, designed to demonstrate clean architecture, security-first thinking, and real-world backend practices.

> This project is intended as a **professional portfolio project** to showcase backend engineering skills, not as a deployed SaaS product.

---

## 📌 Project Overview

Authentication systems are deceptively complex. Beyond simple login and registration, a robust system must handle:

- Secure password storage
- Token lifecycle management
- Account protection against brute-force attacks
- Password recovery
- Email verification
- Clean error handling
- Testability

This project implements a **complete, real-world authentication system** with those concerns explicitly addressed, following industry-standard patterns and security practices.

---

## 🧱 Architecture Overview

The project follows a **layered architecture** with strict separation of concerns:


### Layers Explained

- **Routes**
  - Define HTTP endpoints
  - Wire middleware and controllers
- **Controllers**
  - Handle HTTP request/response
  - No business logic
- **Services**
  - Core business logic
  - Authentication flows and security rules
- **Repositories**
  - All database access
  - No business logic
- **Models**
  - Schema definitions and lifecycle hooks
- **Middlewares**
  - Authentication, authorization, error handling

This structure improves **maintainability**, **testability**, and **clarity**, and mirrors real production backends.

---

## 🔐 Authentication & Authorization Features

### ✅ User Registration
- Email uniqueness enforced
- Passwords hashed using bcrypt
- Clean validation layer

### ✅ Login
- Secure password comparison
- JWT access token issuance
- Refresh token generation
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
- Email verification state tracked in DB

---

## 🛡️ Security Design Decisions

This project explicitly prioritizes security:

- **Password Hashing**
  - bcrypt with a strong cost factor
  - No plaintext passwords ever stored

- **Token Security**
  - Reset & verification tokens are hashed before storage
  - Database leaks do not expose usable tokens

- **Account Protection**
  - Failed login attempt tracking
  - Temporary account lockout after repeated failures

- **JWT Strategy**
  - Short-lived access tokens
  - Refresh tokens stored and revocable

- **Error Handling**
  - Centralized JSON error handling
  - No stack traces or sensitive data leaked to clients

---

## 🧪 Testing Strategy

The project includes **end-to-end tests** using Jest and Supertest.

### Test Coverage Includes:
- Registration flow
- Duplicate user handling
- Login success and failure
- Password reset flow
- Token-based authentication behavior

### Testing Principles:
- Separate test database
- Real HTTP requests (black-box testing)
- No mocking of business logic
- Database cleaned after test runs

---

## ⚙️ Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT
- **Security:** bcrypt
- **Testing:** Jest, Supertest

---

## 🚀 Running the Project Locally

### 1️⃣ Install dependencies
```bash
npm install

## 📐 Architecture Diagram

The system follows a layered architecture with clear separation of concerns.

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
                │ (Business Logic &   │
                │  Auth Flows)        │
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
                │   (User, Tokens)   │
                └─────────────────────┘

### Key Responsibilities

- **Routes**
  - Define API endpoints
  - Attach middleware

- **Controllers**
  - Handle HTTP input/output
  - No business logic

- **Services**
  - Authentication logic
  - Token lifecycle management
  - Security rules

- **Repositories**
  - All database operations
  - No business rules

- **Middlewares**
  - JWT authentication
  - Role-based authorization
  - Global error handling
