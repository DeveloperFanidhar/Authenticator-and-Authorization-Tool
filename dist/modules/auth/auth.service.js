"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const auth_errors_1 = require("./auth.errors");
const auth_validation_1 = require("./auth.validation");
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async registerUser(input) {
        const parsed = auth_validation_1.registerSchema.safeParse(input);
        if (!parsed.success) {
            throw new auth_errors_1.InvalidRegistrationError(parsed.error.issues[0].message);
        }
        const { email, password } = parsed.data;
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new auth_errors_1.UserAlreadyExistsError(email);
        }
        const user = await this.userRepository.createUser({
            email,
            passwordHash: password
        });
        return {
            id: user._id.toString(),
            email: user.email,
            isEmailVerified: user.isEmailVerified
        };
    }
}
exports.AuthService = AuthService;
