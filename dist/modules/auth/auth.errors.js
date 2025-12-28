"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidRegistrationError = exports.UserAlreadyExistsError = void 0;
const app_error_1 = require("../../errors/app.error");
class UserAlreadyExistsError extends app_error_1.AppError {
    constructor(email) {
        super(`User with email ${email} already exists`, 409);
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
class InvalidRegistrationError extends app_error_1.AppError {
    constructor(message) {
        super(message, 400);
    }
}
exports.InvalidRegistrationError = InvalidRegistrationError;
