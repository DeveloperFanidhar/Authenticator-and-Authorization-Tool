import { UserModel } from "./user.model";
import { IUser } from "./user.types";
import { Types } from "mongoose";

export class UserRepository{
    async createUser(data: {
        email: string;
        passwordHash: string;
    }): Promise<IUser> {
        const user = new UserModel({
            email: data.email,
            passwordHash: data.passwordHash
        });
        return user.save();
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return UserModel.findOne({ email }).exec();
    }

    async findById(userId: string): Promise<IUser | null> {
        if(!Types.ObjectId.isValid(userId)){
            return null;
        }
        return UserModel.findById(userId).exec();
    }

    async incrementFailedLogin(userId: string): Promise<void> {
        await UserModel.findByIdAndUpdate(userId, {
            $inc: { failedLoginAttempts: 1 }
        }).exec();
    }

    async resetFailedLogin(userId: string): Promise<void> {
        await UserModel.findByIdAndUpdate(userId, {
            failedLoginAttempts: 0,
            lockUntil: null
        }).exec();
    }

    async lockAccount(userId: string, until: Date): Promise<void> {
        await UserModel.findByIdAndUpdate(userId, {
            lockUntil: until
        }).exec();
    }
}