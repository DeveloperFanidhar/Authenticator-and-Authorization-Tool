import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  register = async (req: Request, res: Response) => {
    const result = await this.authService.registerUser(req.body);
    res.status(201).json(result);
  };

  login = async (req: Request, res: Response) => {
    const result = await this.authService.loginUser(req.body);
    res.status(200).json(result);
  };

  refresh = async (req: Request, res: Response) => {
    const result = await this.authService.refreshTokens(req.body);
    res.status(200).json(result);
  };

  logout = async (req: Request, res: Response) => {
    await this.authService.logout(req.body);
    res.status(204).send();
  };

  forgotPassword = async (req: Request, res: Response) => {
    const result = await this.authService.forgotPassword(req.body);
    res.status(200).json(result);
  };

  resetPassword = async (req: Request, res: Response) => {
    await this.authService.resetPassword(req.body);
    res.status(200).json({ success: true });
  };

  verifyEmail = async (req: Request, res: Response) => {
    await this.authService.verifyEmail(req.body);
    res.status(200).json({ success: true });
  };
}
