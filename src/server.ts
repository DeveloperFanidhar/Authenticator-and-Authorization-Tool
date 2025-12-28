import {createApp} from "./app";
const PORT = process.env.PORT || 3000;
const app = createApp();
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Graceful Shutdown
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
function shutdown(signal: string){
    console.log(`Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
        console.log("HTTP server closed.");
        process.exit(0);
    });
}