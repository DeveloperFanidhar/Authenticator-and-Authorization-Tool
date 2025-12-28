"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.verifyAccessToken = verifyAccessToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Generate JWT access token
 */
function generateAccessToken(payload) {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
        throw new Error("JWT_ACCESS_SECRET is not defined");
    }
    const expiresIn = (process.env.JWT_ACCESS_EXPIRES_IN || "15m");
    const options = {
        expiresIn
    };
    return jsonwebtoken_1.default.sign(payload, secret, options);
}
/**
 * Verify JWT access token
 */
function verifyAccessToken(token) {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
        throw new Error("JWT_ACCESS_SECRET is not defined");
    }
    return jsonwebtoken_1.default.verify(token, secret);
}
console.log("JWT SECRET LOADED:", !!process.env.JWT_ACCESS_SECRET);
