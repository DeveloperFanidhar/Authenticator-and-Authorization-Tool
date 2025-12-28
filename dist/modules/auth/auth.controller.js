"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.register = async (req, res) => {
            const result = await this.authService.registerUser(req.body);
            res.status(201).json(result);
        };
        this.login = async (req, res) => {
            const result = await this.authService.loginUser(req.body);
            res.status(200).json(result);
        };
        this.refresh = async (req, res) => {
            const result = await this.authService.refreshTokens(req.body);
            res.status(200).json(result);
        };
        this.logout = async (req, res) => {
            await this.authService.logout(req.body);
            res.status(204).send();
        };
        this.forgotPassword = async (req, res) => {
            const result = await this.authService.forgotPassword(req.body);
            res.status(200).json(result);
        };
        this.resetPassword = async (req, res) => {
            await this.authService.resetPassword(req.body);
            res.status(200).json({ success: true });
        };
        this.verifyEmail = async (req, res) => {
            await this.authService.verifyEmail(req.body);
            res.status(200).json({ success: true });
        };
    }
}
exports.AuthController = AuthController;
