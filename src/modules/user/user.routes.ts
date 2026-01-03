import { Router } from "express";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

// ✅ Dependency injection (same pattern as auth routes)
const userRepository = new UserRepository();
const userController = new UserController(userRepository);

// =========================
// CURRENT USER
// =========================
router.get("/me", requireAuth, userController.getCurrentUser);

// =========================
// ADMIN OPERATIONS
// =========================
router.get("/", requireAuth, userController.getAllUsers);

router.patch(
  "/role",
  requireAuth,
  userController.updateUserRole
);

export default router;
