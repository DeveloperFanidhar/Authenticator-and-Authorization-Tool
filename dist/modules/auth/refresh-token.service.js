"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = generateRefreshToken;
exports.storeRefreshToken = storeRefreshToken;
exports.rotateRefreshToken = rotateRefreshToken;
exports.revokeRefreshToken = revokeRefreshToken;
const crypto_1 = __importDefault(require("crypto"));
const mongoose_1 = require("mongoose");
const refresh_token_model_1 = require("./refresh-token.model");
const REFRESH_TOKEN_TTL_DAYS = 30;
// ✅ MUST be exported
function generateRefreshToken() {
    return crypto_1.default.randomBytes(64).toString("hex");
}
function hashToken(token) {
    return crypto_1.default.createHash("sha256").update(token).digest("hex");
}
// ✅ MUST be exported
async function storeRefreshToken(userId, token) {
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000);
    await refresh_token_model_1.RefreshTokenModel.create({
        userId: new mongoose_1.Types.ObjectId(userId),
        tokenHash: hashToken(token),
        expiresAt
    });
}
// ✅ MUST be exported
async function rotateRefreshToken(oldToken) {
    const tokenHash = hashToken(oldToken);
    const existing = await refresh_token_model_1.RefreshTokenModel.findOneAndDelete({
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
async function revokeRefreshToken(token) {
    await refresh_token_model_1.RefreshTokenModel.deleteOne({
        tokenHash: hashToken(token)
    });
}
