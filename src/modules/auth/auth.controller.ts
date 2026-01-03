import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const result = await this.authService.register(req.body);
    res.status(201).json(result);
  };

  login = async (req: Request, res: Response) => {
    const result = await this.authService.login(req.body);
    res.status(200).json(result);
  };

  logout = async (_req: Request, res: Response) => {
    await this.authService.logout();
    res.status(204).send();
  };
}
