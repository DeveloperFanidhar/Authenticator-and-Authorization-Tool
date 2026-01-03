import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import { errorHandler } from "./middlewares/error.middleware";

export function createApp() {
  const app = express();

  // GLOBAL MIDDLEWARES
  app.use(express.json());

  // ROUTES
  app.use("/auth", authRoutes);
  app.use("/users", userRoutes);
  app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

  // 404 HANDLER (NO ROUTE MATCHED)
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: "Route not found"
    });
  });

  // GLOBAL ERROR HANDLER MUST BE LAST
  app.use(errorHandler);

  return app;
}
