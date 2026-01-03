import http from "http";
import { env } from "./config/env";
import { createApp } from "./app";
import { connectDatabase, disconnectDatabase } from "./database/database";

let server: http.Server;

async function startServer() {
  await connectDatabase();

  const app = createApp();

  server = app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
}

async function shutdown(signal: string) {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);

  try {
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server.close((err) => {
          if (err) reject(err);
          resolve();
        });
      });
      console.log("HTTP server closed");
    }

    await disconnectDatabase();
    process.exit(0);
  } catch (err) {
    console.error("Graceful shutdown failed", err);
    process.exit(1);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer().catch((err) => {
  console.error("Startup failed:", err);
  process.exit(1);
});
