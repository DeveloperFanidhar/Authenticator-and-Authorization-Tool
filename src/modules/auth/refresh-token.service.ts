import crypto from "crypto";
import { Types } from "mongoose";
import { RefreshTokenModel } from "./refresh-token.model";

const REFRESH_TOKEN_TTL_DAYS = 30;

// ✅ MUST be exported
export function generateRefreshToken(): string {
  return crypto.randomBytes(64).toString("hex");
}

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// ✅ MUST be exported
export async function storeRefreshToken(
  userId: string,
  token: string
): Promise<void> {
  const expiresAt = new Date(
    Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000
  );

  await RefreshTokenModel.create({
    userId: new Types.ObjectId(userId),
    tokenHash: hashToken(token),
    expiresAt
  });
}

// ✅ MUST be exported
export async function rotateRefreshToken(
  oldToken: string
): Promise<{ userId: string; newToken: string }> {
  const tokenHash = hashToken(oldToken);

  const existing = await RefreshTokenModel.findOneAndDelete({
    tokenHash,
    expiresAt: { $gt: new Date() }
  });

  if (!existing) {
    throw new Error("Invalid or expired refresh token");
  }

  const newToken = generateRefreshToken();
  await storeRefreshToken(existing.userId.toString(), newToken);

  return {
    userId: existing.userId.toString(),
    newToken
  };
}

// ✅ MUST be exported
export async function revokeRefreshToken(
  token: string
): Promise<void> {
  await RefreshTokenModel.deleteOne({
    tokenHash: hashToken(token)
  });
}
