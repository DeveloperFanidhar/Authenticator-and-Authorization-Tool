"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_errors_1 = require("./auth.errors");
const auth_validation_1 = require("./auth.validation");
const token_service_1 = require("./token.service");
const refresh_token_service_1 = require("./refresh-token.service");
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_TIME_MS = 15 * 60 * 1000;
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    // =========================
    // REGISTER
    // =========================
    async registerUser(input) {
        const parsed = auth_validation_1.registerSchema.safeParse(input);
        if (!parsed.success) {
            throw new Error(parsed.error.issues[0].message);
        }
        const { email, password } = parsed.data;
        const existing = await this.userRepository.findByEmail(email);
        if (existing) {
            throw new auth_errors_1.UserAlreadyExistsError(email);
        }
        const user = await this.userRepository.createUser({
            email,
            passwordHash: password
        });
        return {
            id: user._id.toString(),
            email: user.email
        };
    }
    // =========================
    // LOGIN
    // =========================
    async loginUser(input) {
        const { email, password } = input;
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new auth_errors_1.InvalidCredentialsError();
        }
        if (user.lockUntil && user.lockUntil > new Date()) {
            throw new auth_errors_1.AccountLockedError(user.lockUntil);
        }
        const match = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!match) {
            throw new auth_errors_1.InvalidCredentialsError();
        }
        const refreshToken = (0, refresh_token_service_1.generateRefreshToken)();
        await (0, refresh_token_service_1.storeRefreshToken)(user._id.toString(), refreshToken);
        const accessToken = (0, token_service_1.generateAccessToken)({
            sub: user._id.toString(),
            email: user.email,
            role: user.role
        });
        return {
            id: user._id.toString(),
            email: user.email,
            accessToken,
            refreshToken
        };
    }
    // =========================
    // REFRESH TOKENS
    // =========================
    async refreshTokens(input) {
        const { userId, newToken } = await (0, refresh_token_service_1.rotateRefreshToken)(input.refreshToken);
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new auth_errors_1.InvalidCredentialsError();
        }
        const accessToken = (0, token_service_1.generateAccessToken)({
            sub: userId,
            email: user.email,
            role: user.role
        });
        return {
            accessToken,
            refreshToken: newToken
        };
    }
    // =========================
    // LOGOUT
    // =========================
    async logout(input) {
        await (0, refresh_token_service_1.revokeRefreshToken)(input.refreshToken);
    }
    // =========================
    // PASSWORD RESET
    // =========================
    async forgotPassword(input) {
        const user = await this.userRepository.findByEmail(input.email);
        if (!user) {
            return { resetToken: "ok" };
        }
        const token = await this.userRepository.setPasswordResetToken(user._id.toString());
        return { resetToken: token };
    }
    async resetPassword(input) {
        const user = await this.userRepository.findByResetToken(input.token);
        if (!user) {
            throw new auth_errors_1.InvalidCredentialsError();
        }
        user.passwordHash = input.newPassword;
        await user.save();
        await this.userRepository.clearResetToken(user._id.toString());
    }
    // =========================
    // EMAIL VERIFICATION
    // =========================
    async verifyEmail(input) {
        const user = await this.userRepository.findByEmailVerificationToken(input.token);
        if (!user) {
            throw new auth_errors_1.InvalidCredentialsError();
        }
        await this.userRepository.verifyEmail(user._id.toString());
    }
}
exports.AuthService = AuthService;
