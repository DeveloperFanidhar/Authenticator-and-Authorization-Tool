"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const token_service_1 = require("../modules/auth/token.service");
/**
 * Authentication middleware
 * - Validates JWT access token
 * - Attaches user info to request
 */
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.substring(7); // remove "Bearer "
    try {
        const payload = (0, token_service_1.verifyAccessToken)(token);
        req.user = {
            id: payload.sub,
            email: payload.email,
            role: payload.role
        };
        next();
    }
    catch {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}
