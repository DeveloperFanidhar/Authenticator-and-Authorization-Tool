import bcrypt from "bcrypt";
import { UserRepository } from "../user/user.repository";
import {
  UserAlreadyExistsError,
  InvalidCredentialsError,
  AccountLockedError
} from "./auth.errors";
import { registerSchema, RegisterInput } from "./auth.validation";
import { generateAccessToken } from "./token.service";
import {
  generateRefreshToken,
  storeRefreshToken,
  rotateRefreshToken,
  revokeRefreshToken
} from "./refresh-token.service";

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_TIME_MS = 15 * 60 * 1000;

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  // =========================
  // REGISTER
  // =========================
  async registerUser(input: RegisterInput) {
    const parsed = registerSchema.safeParse(input);
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0].message);
    }

    const { email, password } = parsed.data;

    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new UserAlreadyExistsError(email);
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
  async loginUser(input: {
    email: string;
    password: string;
  }) {
    const { email, password } = input;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    if (user.lockUntil && user.lockUntil > new Date()) {
      throw new AccountLockedError(user.lockUntil);
    }

    const match = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!match) {
      throw new InvalidCredentialsError();
    }

    const refreshToken = generateRefreshToken();
    await storeRefreshToken(user._id.toString(), refreshToken);

    const accessToken = generateAccessToken({
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
  async refreshTokens(input: {
    refreshToken: string;
  }) {
    const { userId, newToken } =
      await rotateRefreshToken(input.refreshToken);

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const accessToken = generateAccessToken({
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
  async logout(input: { refreshToken: string }) {
    await revokeRefreshToken(input.refreshToken);
  }

  // =========================
  // PASSWORD RESET
  // =========================
  async forgotPassword(input: { email: string }) {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      return { resetToken: "ok" };
    }

    const token =
      await this.userRepository.setPasswordResetToken(
        user._id.toString()
      );

    return { resetToken: token };
  }

  async resetPassword(input: {
    token: string;
    newPassword: string;
  }) {
    const user =
      await this.userRepository.findByResetToken(
        input.token
      );

    if (!user) {
      throw new InvalidCredentialsError();
    }

    user.passwordHash = input.newPassword;
    await user.save();

    await this.userRepository.clearResetToken(
      user._id.toString()
    );
  }

  // =========================
  // EMAIL VERIFICATION
  // =========================
  async verifyEmail(input: { token: string }) {
    const user =
      await this.userRepository.findByEmailVerificationToken(
        input.token
      );

    if (!user) {
      throw new InvalidCredentialsError();
    }

    await this.userRepository.verifyEmail(
      user._id.toString()
    );
  }
}
