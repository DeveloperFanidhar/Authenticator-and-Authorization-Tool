"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_model_1 = require("./user.model");
const mongoose_1 = require("mongoose");
class UserRepository {
    async createUser(data) {
        const user = new user_model_1.UserModel({
            email: data.email,
            passwordHash: data.passwordHash
        });
        return user.save();
    }
    async findByEmail(email) {
        return user_model_1.UserModel.findOne({ email }).exec();
    }
    async findById(userId) {
        if (!mongoose_1.Types.ObjectId.isValid(userId)) {
            return null;
        }
        return user_model_1.UserModel.findById(userId).exec();
    }
    async incrementFailedLogin(userId) {
        await user_model_1.UserModel.findByIdAndUpdate(userId, {
            $inc: { failedLoginAttempts: 1 }
        }).exec();
    }
    async resetFailedLogin(userId) {
        await user_model_1.UserModel.findByIdAndUpdate(userId, {
            failedLoginAttempts: 0,
            lockUntil: null
        }).exec();
    }
    async lockAccount(userId, until) {
        await user_model_1.UserModel.findByIdAndUpdate(userId, {
            lockUntil: until
        }).exec();
    }
}
exports.UserRepository = UserRepository;
