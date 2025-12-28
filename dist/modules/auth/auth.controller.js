"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const user_repository_1 = require("../user/user.repository");
class AuthController {
    constructor() {
        // POST /auth/register
        this.register = async (req, res, next) => {
            try {
                const user = await this.authService.registerUser(req.body);
                res.status(201).json({
                    message: "User registered successfully",
                    data: user
                });
            }
            catch (error) {
                next(error);
            }
        };
        const userRepository = new user_repository_1.UserRepository();
        this.authService = new auth_service_1.AuthService(userRepository);
    }
}
exports.AuthController = AuthController;
