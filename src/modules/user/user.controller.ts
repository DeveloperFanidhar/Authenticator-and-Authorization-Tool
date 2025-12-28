import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import { UserRepository } from "./user.repository";
import { Role } from "../auth/rbac.constants";

export class UserController {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    /*
     * GET /users/me
     * Any authenticated user
     */
    getMyProfile = async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
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
                id: (user as any)._id.toString(),
                email: user.email,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
                createdAt: user.createdAt,
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * GET /users
     * Requires READ_USERS permission
     */
    listUsers = async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const users = await this.userRepository.findAll();
            res.status(200).json(
                users.map((user) => ({
                    id: (user as any)._id.toString(),
                    email: user.email,
                    role: user.role,
                    isEmailVerified: user.isEmailVerified,
                }))
            );
        } catch (error) {
            next(error);
        }
    };

    changeUserRole = async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { userId, role } = req.body;

            if (!Object.values(Role).includes(role)) {
                res.status(400).json({ error: "Invalid role" });
                return;
            }

            const updatedUser = await this.userRepository.updateUserRole(
                userId,
                role
            );

            if (!updatedUser) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            res.status(200).json({
                message: "User role updated",
                data: {
                    id: (updatedUser as any)._id.toString(),
                    email: updatedUser.email,
                    role: updatedUser.role,
                },
            });
        } catch (error) {
            next(error);
        }
    };
}
