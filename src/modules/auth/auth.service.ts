import bcrypt from "bcrypt";
import { env } from "../../config/env";
import { UserRepository } from "../user/user.repository";
import { Role } from "../user/user.types";
import { signAccessToken } from "./token.service";

export class AuthService {
  constructor(private readonly users: UserRepository) {}

  async register(input: { email: string; password: string }) {
    const existing = await this.users.findByEmail(input.email);
    if (existing) {
      throw new Error("User already exists");
    }

    const passwordHash = await bcrypt.hash(input.password, 12);
    const role: Role = "USER";

    const user = await this.users.createUser({
      email: input.email,
      passwordHash,
      role,
      isEmailVerified: false
    });

    return {
      id: user.id,
      email: user.email
    };
  }

  async login(input: { email: string; password: string }) {
    const user = await this.users.findByEmail(input.email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await bcrypt.compare(input.password, user.passwordHash);
    if (!valid) {
      throw new Error("Invalid credentials");
    }

    const accessToken = signAccessToken(
      {
        sub: user.id,
        email: user.email,
        role: user.role
      },
      env.JWT_ACCESS_SECRET,
      env.JWT_ACCESS_TTL
    );

    return { accessToken };
  }

  async logout() {
    // Stateless JWT → nothing to do
    return;
  }
}
