import jwt, { SignOptions } from "jsonwebtoken";

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: string;
}

export function signAccessToken(
  payload: AccessTokenPayload,
  secret: string,
  expiresIn: SignOptions["expiresIn"]
): string {
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyAccessToken<T extends object>(
  token: string,
  secret: string
): T {
  return jwt.verify(token, secret) as T;
}
