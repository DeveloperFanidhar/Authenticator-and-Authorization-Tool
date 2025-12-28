import { AppError } from "../../utils/app-error";

export class UserAlreadyExistsError extends AppError {
  constructor(email: string) {
    super(`User already exists with email: ${email}`, 409);
  }
}

export class InvalidCredentialsError extends AppError {
  constructor() {
    super("Invalid email or password", 401);
  }
}

export class AccountLockedError extends AppError {
  constructor(lockUntil: Date) {
    super(
      `Account locked until ${lockUntil.toISOString()}`,
      423
    );
  }
}
