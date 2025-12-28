"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT || 3000;
const app = (0, app_1.createApp)();
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Graceful Shutdown
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
function shutdown(signal) {
    console.log(`Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
        console.log("HTTP server closed.");
        process.exit(0);
    });
}
