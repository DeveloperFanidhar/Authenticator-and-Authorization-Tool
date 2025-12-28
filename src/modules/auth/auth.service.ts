import { UserRepository } from "../user/user.repository";
import { UserAlreadyExistsError, InvalidRegistrationError } from "./auth.errors";
import { registerSchema, RegisterInput } from "./auth.validation";

export class AuthService {
  constructor( private readonly userRepository: UserRepository) {}

  async registerUser(input: RegisterInput): Promise<{
    id: string;
    email: string;
    isEmailVerified: boolean;
  }> {
    const parsed = registerSchema.safeParse(input);

    if (!parsed.success) {
      throw new InvalidRegistrationError(
        parsed.error.issues[0].message
      );
    }

    const { email, password } = parsed.data;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new UserAlreadyExistsError(email);
    }

    const user = await this.userRepository.createUser({
      email,
      passwordHash: password
    });

    return {
      id: (user as any)._id.toString(),
      email: user.email,
      isEmailVerified: user.isEmailVerified
    };
  }
}
