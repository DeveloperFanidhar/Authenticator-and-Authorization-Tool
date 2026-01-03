"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const app_error_1 = require("../utils/app-error");
function errorHandler(err, req, res, _next) {
    let statusCode = 500;
    let message = "Internal Server Error";
    if (err instanceof app_error_1.AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        error: message
    });
}
