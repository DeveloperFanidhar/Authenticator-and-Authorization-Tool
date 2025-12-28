import crypto from "crypto";
import { UserModel } from "./user.model";
import { Role } from "../auth/rbac.constants";

export class UserRepository {
  async findByEmail(email: string) {
    return UserModel.findOne({
      email: email.toLowerCase().trim()
    });
  }

  async findById(id: string) {
    return UserModel.findById(id);
  }

  async findAll() {
    return UserModel.find().sort({ createdAt: -1 });
  }

  async createUser(data: {
    email: string;
    passwordHash: string;
    role?: Role;
  }) {
    return UserModel.create(data);
  }

  async updateUserRole(userId: string, role: Role) {
    return UserModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );
  }

  async incrementFailedLogin(userId: string) {
    return UserModel.findByIdAndUpdate(
      userId,
      { $inc: { failedLoginAttempts: 1 } },
      { new: true }
    );
  }

  async resetFailedLogin(userId: string) {
    return UserModel.findByIdAndUpdate(
      userId,
      {
        failedLoginAttempts: 0,
        lockUntil: null
      },
      { new: true }
    );
  }

  async lockAccount(userId: string, until: Date) {
    return UserModel.findByIdAndUpdate(
      userId,
      {
        failedLoginAttempts: 0,
        lockUntil: until
      },
      { new: true }
    );
  }

  // =========================
  // PASSWORD RESET
  // =========================

  async setPasswordResetToken(userId: string) {
    const raw = crypto.randomBytes(32).toString("hex");

    const hashed = crypto
      .createHash("sha256")
      .update(raw)
      .digest("hex");

    await UserModel.findByIdAndUpdate(userId, {
      passwordResetToken: hashed,
      passwordResetExpires: new Date(Date.now() + 15 * 60 * 1000)
    });

    return raw;
  }

  async findByResetToken(token: string) {
    const hashed = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    return UserModel.findOne({
      passwordResetToken: hashed,
      passwordResetExpires: { $gt: new Date() }
    });
  }

  async clearResetToken(userId: string) {
    await UserModel.findByIdAndUpdate(userId, {
      passwordResetToken: null,
      passwordResetExpires: null
    });
  }

  // =========================
  // EMAIL VERIFICATION
  // =========================

  async setEmailVerificationToken(userId: string) {
    const raw = crypto.randomBytes(32).toString("hex");

    const hashed = crypto
      .createHash("sha256")
      .update(raw)
      .digest("hex");

    await UserModel.findByIdAndUpdate(userId, {
      emailVerificationToken: hashed,
      emailVerificationExpires: new Date(
        Date.now() + 24 * 60 * 60 * 1000
      )
    });

    return raw;
  }

  async findByEmailVerificationToken(token: string) {
    const hashed = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    return UserModel.findOne({
      emailVerificationToken: hashed,
      emailVerificationExpires: { $gt: new Date() }
    });
  }

  async verifyEmail(userId: string) {
    await UserModel.findByIdAndUpdate(userId, {
      isEmailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpires: null
    });
  }
}
