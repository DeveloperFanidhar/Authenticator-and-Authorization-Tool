import { Router } from "express";
import { UserController } from "./user.controller";
import { requireAuth } from "../../middlewares/auth.middleware";
import { requiresPermission } from "../../middlewares/rbac.middleware";
import { Permission } from "../auth/rbac.constants";
import { requireRole } from "../../middlewares/rbac.middleware";
import { Role } from "../auth/rbac.constants";


const router = Router();
const userController = new UserController();

router.get("/me", requireAuth, userController.getMyProfile);

router.get(
    "/",
    requireAuth,
    requiresPermission(Permission.READ_USERS),
    userController.listUsers
);

router.patch(
  "/role",
  requireAuth,
  requireRole(Role.ADMIN),
  userController.changeUserRole
);

export default router;
