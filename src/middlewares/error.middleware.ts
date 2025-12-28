import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error";

export function errorHandler( err: Error, req: Request, res: Response, next: NextFunction ){
    // Known, Operational Errors
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            error: err.message
        });
    }

    // Unknown / programmer errors
    console.error("Unhandled error: ", err);

    return res.status(500).json({
        error: "internal server error"
    });
}