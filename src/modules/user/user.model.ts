import mongoose, { Schema, Model, HydratedDocument } from "mongoose";
import { IUser } from "./user.types";
import bcrypt from "bcrypt";

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
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre(
  "save",
  async function (this: HydratedDocument<IUser>) {
    if (!this.isModified("passwordHash")) {
      return;
    }

    const saltRounds = 12;
    this.passwordHash = await bcrypt.hash(this.passwordHash, saltRounds);
  }
);

export const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
