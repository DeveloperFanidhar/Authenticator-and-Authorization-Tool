"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_repository_1 = require("./user.repository");
const rbac_constants_1 = require("../auth/rbac.constants");
class UserController {
    constructor() {
        /*
         * GET /users/me
         * Any authenticated user
         */
        this.getMyProfile = async (req, res, next) => {
            try {
                if (!req.user) {
                    res.status(401).json({ error: "Unauthorized" });
                    return;
                }
                const user = await this.userRepository.findById(req.user.id);
                if (!user) {
                    res.status(404).json({ error: "User not found" });
                    return;
                }
                res.status(200).json({
                    id: user._id.toString(),
                    email: user.email,
                    role: user.role,
                    isEmailVerified: user.isEmailVerified,
                    createdAt: user.createdAt,
                });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * GET /users
         * Requires READ_USERS permission
         */
        this.listUsers = async (req, res, next) => {
            try {
                const users = await this.userRepository.findAll();
                res.status(200).json(users.map((user) => ({
                    id: user._id.toString(),
                    email: user.email,
                    role: user.role,
                    isEmailVerified: user.isEmailVerified,
                })));
            }
            catch (error) {
                next(error);
            }
        };
        this.changeUserRole = async (req, res, next) => {
            try {
                const { userId, role } = req.body;
                if (!Object.values(rbac_constants_1.Role).includes(role)) {
                    res.status(400).json({ error: "Invalid role" });
                    return;
                }
                const updatedUser = await this.userRepository.updateUserRole(userId, role);
                if (!updatedUser) {
                    res.status(404).json({ error: "User not found" });
                    return;
                }
                res.status(200).json({
                    message: "User role updated",
                    data: {
                        id: updatedUser._id.toString(),
                        email: updatedUser.email,
                        role: updatedUser.role,
                    },
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.userRepository = new user_repository_1.UserRepository();
    }
}
exports.UserController = UserController;
