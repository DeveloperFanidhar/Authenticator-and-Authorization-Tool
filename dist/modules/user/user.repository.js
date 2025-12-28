"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const crypto_1 = __importDefault(require("crypto"));
const user_model_1 = require("./user.model");
class UserRepository {
    async findByEmail(email) {
        return user_model_1.UserModel.findOne({
            email: email.toLowerCase().trim()
        });
    }
    async findById(id) {
        return user_model_1.UserModel.findById(id);
    }
    async findAll() {
        return user_model_1.UserModel.find().sort({ createdAt: -1 });
    }
    async createUser(data) {
        return user_model_1.UserModel.create(data);
    }
    async updateUserRole(userId, role) {
        return user_model_1.UserModel.findByIdAndUpdate(userId, { role }, { new: true });
    }
    async incrementFailedLogin(userId) {
        return user_model_1.UserModel.findByIdAndUpdate(userId, { $inc: { failedLoginAttempts: 1 } }, { new: true });
    }
    async resetFailedLogin(userId) {
        return user_model_1.UserModel.findByIdAndUpdate(userId, {
            failedLoginAttempts: 0,
            lockUntil: null
        }, { new: true });
    }
    async lockAccount(userId, until) {
        return user_model_1.UserModel.findByIdAndUpdate(userId, {
            failedLoginAttempts: 0,
            lockUntil: until
        }, { new: true });
    }
    // =========================
    // PASSWORD RESET
    // =========================
    async setPasswordResetToken(userId) {
        const raw = crypto_1.default.randomBytes(32).toString("hex");
        const hashed = crypto_1.default
            .createHash("sha256")
            .update(raw)
            .digest("hex");
        await user_model_1.UserModel.findByIdAndUpdate(userId, {
            passwordResetToken: hashed,
            passwordResetExpires: new Date(Date.now() + 15 * 60 * 1000)
        });
        return raw;
    }
    async findByResetToken(token) {
        const hashed = crypto_1.default
            .createHash("sha256")
            .update(token)
            .digest("hex");
        return user_model_1.UserModel.findOne({
            passwordResetToken: hashed,
            passwordResetExpires: { $gt: new Date() }
        });
    }
    async clearResetToken(userId) {
        await user_model_1.UserModel.findByIdAndUpdate(userId, {
            passwordResetToken: null,
            passwordResetExpires: null
        });
    }
    // =========================
    // EMAIL VERIFICATION
    // =========================
    async setEmailVerificationToken(userId) {
        const raw = crypto_1.default.randomBytes(32).toString("hex");
        const hashed = crypto_1.default
            .createHash("sha256")
            .update(raw)
            .digest("hex");
        await user_model_1.UserModel.findByIdAndUpdate(userId, {
            emailVerificationToken: hashed,
            emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });
        return raw;
    }
    async findByEmailVerificationToken(token) {
        const hashed = crypto_1.default
            .createHash("sha256")
            .update(token)
            .digest("hex");
        return user_model_1.UserModel.findOne({
            emailVerificationToken: hashed,
            emailVerificationExpires: { $gt: new Date() }
        });
    }
    async verifyEmail(userId) {
        await user_model_1.UserModel.findByIdAndUpdate(userId, {
            isEmailVerified: true,
            emailVerificationToken: null,
            emailVerificationExpires: null
        });
    }
}
exports.UserRepository = UserRepository;
