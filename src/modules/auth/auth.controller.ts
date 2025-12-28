import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { UserRepository } from "../user/user.repository";

export class AuthController {
    private authService: AuthService;
    constructor(){
        const userRepository = new UserRepository();
        this.authService = new AuthService(userRepository);
    }

    // POST /auth/register
    // register = async( req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try{
    //         const user = await this.authService.registerUser(req.body);
    //         res.status(201).json({
    //             message: "User registered successfully",
    //             data: user
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // };
    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("REGISTER INPUT:", req.body); // 👈 add this
            const user = await this.authService.registerUser(req.body);
            res.status(201).json({ message: "User registered successfully", data: user });
        } catch (error) {
            console.error("REGISTER ERROR:", error); // 👈 add this
            next(error);
        }
    };

}