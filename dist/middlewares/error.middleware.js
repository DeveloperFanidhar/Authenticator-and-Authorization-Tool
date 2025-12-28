"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const app_error_1 = require("../errors/app.error");
function errorHandler(err, req, res, next) {
    // Known, Operational Errors
    if (err instanceof app_error_1.AppError) {
        return res.status(err.statusCode).json({
            error: err.message
        });
    }
    // Unknown / programmer errors
    console.error("Unhandled error: ", err);
    return res.status(500).json({
        error: "internal server error"
    });
}
