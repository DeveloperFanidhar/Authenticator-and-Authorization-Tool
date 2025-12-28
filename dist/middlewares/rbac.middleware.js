"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = requireRole;
exports.requiresPermission = requiresPermission;
const rbac_constants_1 = require("../modules/auth/rbac.constants");
function requireRole(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    };
}
function requiresPermission(permission) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const role = req.user.role;
        const permissions = rbac_constants_1.RolePermissions[role] || [];
        if (!permissions.includes(permission)) {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    };
}
