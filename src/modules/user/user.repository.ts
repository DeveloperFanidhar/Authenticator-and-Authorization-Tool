import { UserModel } from "./user.model";
import { IUser, Role } from "./user.types";

export class UserRepository {
  async findByEmail(email: string) {
    return UserModel.findOne({ email }).exec();
  }

  async findById(userId: string) {
    return UserModel.findById(userId).exec();
  }

  async findAll() {
    return UserModel.find().exec();
  }

  async createUser(data: {
    email: string;
    passwordHash: string;
    role: Role;
    isEmailVerified: boolean;
  }) {
    const user = new UserModel({
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role,
      isEmailVerified: data.isEmailVerified,
      failedLoginAttempts: 0,
      lockUntil: null
    });

    return user.save();
  }

  async updateUserRole(userId: string, role: Role) {
    return UserModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).exec();
  }
}
