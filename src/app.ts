import express, {Application, Request, Response} from "express";
import authRoutes from "./modules/auth/auth.routes";

// Error Handler
import { errorHandler } from "./middlewares/error.middleware";

export function createApp(): Application{
    const app = express();
    // Global Middlewares
    app.use(express.json());
    // Health Check
    app.get("/health",(req: Request, res: Response) => {
        res.status(200).json({
            status: "ok",
            uptime: process.uptime()
        });
    });
    // Auth Routes
    app.use("/auth", authRoutes);
    // 404 handler
    app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
    });

    // Global error handler (MUST be last)
    app.use(errorHandler);

    return app;
}