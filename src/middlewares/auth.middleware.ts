import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../modules/auth/token.service";
import { Role } from "../modules/user/user.types";
import { env } from "../config/env";

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

  const token = authHeader.substring(7);

  try {
    const payload = verifyAccessToken<{
      sub: string;
      email: string;
      role: Role;
    }>(token, env.JWT_ACCESS_SECRET);

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
