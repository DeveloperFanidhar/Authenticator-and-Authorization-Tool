"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
function createApp() {
    const app = (0, express_1.default)();
    // GLOBAL MIDDLEWARES
    app.use(express_1.default.json());
    // ROUTES
    app.use("/auth", auth_routes_1.default);
    app.use("/users", user_routes_1.default);
    // 404 HANDLER (NO ROUTE MATCHED)
    app.use((req, res) => {
        res.status(404).json({
            success: false,
            error: "Route not found"
        });
    });
    // GLOBAL ERROR HANDLER MUST BE LAST
    app.use(error_middleware_1.errorHandler);
    return app;
}
