import { AppError } from "../../errors/app.error";

export class UserAlreadyExistsError extends AppError {
  constructor(email: string) {
    super(`User with email ${email} already exists`, 409);
  }
}

export class InvalidRegistrationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
