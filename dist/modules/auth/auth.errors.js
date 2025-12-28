"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountLockedError = exports.InvalidCredentialsError = exports.UserAlreadyExistsError = void 0;
const app_error_1 = require("../../utils/app-error");
class UserAlreadyExistsError extends app_error_1.AppError {
    constructor(email) {
        super(`User already exists with email: ${email}`, 409);
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
class InvalidCredentialsError extends app_error_1.AppError {
    constructor() {
        super("Invalid email or password", 401);
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
class AccountLockedError extends app_error_1.AppError {
    constructor(lockUntil) {
        super(`Account locked until ${lockUntil.toISOString()}`, 423);
    }
}
exports.AccountLockedError = AccountLockedError;
