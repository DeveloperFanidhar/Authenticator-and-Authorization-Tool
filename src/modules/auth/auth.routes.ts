import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserRepository } from "../user/user.repository";

const router = Router();

const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const controller = new AuthController(authService);

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);

export default router;
