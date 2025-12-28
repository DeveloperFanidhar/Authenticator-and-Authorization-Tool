"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app");
const database_1 = require("./database/database");
const PORT = process.env.PORT || 3000;
async function startServer() {
    // 🔒 DB MUST CONNECT FIRST
    await (0, database_1.connectDatabase)();
    const app = (0, app_1.createApp)();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
startServer().catch((err) => {
    console.error("Startup failed:", err);
    process.exit(1);
});
