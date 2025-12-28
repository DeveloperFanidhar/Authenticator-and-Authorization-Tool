import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../modules/auth/token.service";
import { Role } from "../modules/auth/rbac.constants";

/**
 * Request object after authentication
 */
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: Role;
  };
}

/**
 * Authentication middleware
 * - Validates JWT access token
 * - Attaches user info to request
 */
export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.substring(7); // remove "Bearer "

  try {
    const payload = verifyAccessToken(token);

    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role
    };

    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
