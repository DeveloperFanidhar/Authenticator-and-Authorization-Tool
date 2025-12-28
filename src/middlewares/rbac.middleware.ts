import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware";
import { Role, Permission, RolePermissions } from "../modules/auth/rbac.constants";

export function requireRole(...roles: Role[]) {
    return (
        req: AuthenticatedRequest, 
        res: Response,
        next: NextFunction
    ) => {
        if(!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if(!roles.includes(req.user.role as Role)){
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    };
}

export function requiresPermission(permission: Permission){
    return( req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if(!req.user){
            return res.status(401).json({error: "Unauthorized"});
        }

        const role = req.user.role as Role;
        const permissions = RolePermissions[role] || [];

        if(!permissions.includes(permission)){
            return res.status(403).json({ error: "Forbidden"});
        }
        next();
    };
}