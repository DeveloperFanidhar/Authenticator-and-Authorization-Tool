import { Response } from "express";
import { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import { UserRepository } from "./user.repository";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  getCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      email: user.email,
      role: user.role
    });
  };

  getAllUsers = async (_req: AuthenticatedRequest, res: Response) => {
    const users = await this.userRepository.findAll();

    res.json(
      users.map((user) => ({
        id: user.id,
        email: user.email,
        role: user.role
      }))
    );
  };

  updateUserRole = async (req: AuthenticatedRequest, res: Response) => {
    const { userId, role } = req.body;

    const updatedUser = await this.userRepository.updateUserRole(userId, role);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role
    });
  };
}
