export interface IUser {
  email: string;
  passwordHash: string;

  role: "USER" | "ADMIN";

  isEmailVerified: boolean;

  failedLoginAttempts: number;
  lockUntil: Date | null;

  // =========================
  // PASSWORD RESET
  // =========================
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;

  // =========================
  // EMAIL VERIFICATION
  // =========================
  emailVerificationToken?: string | null;
  emailVerificationExpires?: Date | null;

  createdAt?: Date;
  updatedAt?: Date;
}
