import mongoose, { Schema, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./user.types";
import { Role, ROLE_VALUES } from "../auth/rbac.constants";

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },

    passwordHash: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ROLE_VALUES,
      default: Role.USER,
      index: true
    },

    isEmailVerified: {
      type: Boolean,
      default: false
    },

    failedLoginAttempts: {
      type: Number,
      default: 0
    },

    lockUntil: {
      type: Date,
      default: null
    },

    // =========================
    // PASSWORD RESET
    // =========================
    passwordResetToken: {
      type: String,
      default: null
    },

    passwordResetExpires: {
      type: Date,
      default: null
    },

    // =========================
    // EMAIL VERIFICATION
    // =========================
    emailVerificationToken: {
      type: String,
      default: null
    },

    emailVerificationExpires: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

/**
 * Hash password before saving
 */
UserSchema.pre(
  "save",
  async function (this: HydratedDocument<IUser>) {
    if (!this.isModified("passwordHash")) {
      return;
    }

    this.passwordHash = await bcrypt.hash(
      this.passwordHash,
      12
    );
  }
);

export const UserModel =
  mongoose.models.User ??
  mongoose.model<IUser>("User", UserSchema);
