import jwt, { SignOptions } from "jsonwebtoken";
import { Role } from "./rbac.constants";

/**
 * Payload stored inside JWT access token
 */
export interface AccessTokenPayload {
  sub: string;     // user id
  email: string;
  role: Role;
}

/**
 * Generate JWT access token
 */
export function generateAccessToken(
  payload: AccessTokenPayload
): string {
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not defined");
  }

  const expiresIn =
    (process.env.JWT_ACCESS_EXPIRES_IN || "15m") as SignOptions["expiresIn"];

  const options: SignOptions = {
    expiresIn
  };

  return jwt.sign(payload, secret, options);
}

/**
 * Verify JWT access token
 */
export function verifyAccessToken(
  token: string
): AccessTokenPayload {
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not defined");
  }

  return jwt.verify(token, secret) as AccessTokenPayload;
}
console.log("JWT SECRET LOADED:", !!process.env.JWT_ACCESS_SECRET);
