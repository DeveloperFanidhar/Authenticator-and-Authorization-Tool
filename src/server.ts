import "dotenv/config";
import { createApp } from "./app";
import { connectDatabase } from "./database/database";

const PORT = process.env.PORT || 3000;

async function startServer() {
  // 🔒 DB MUST CONNECT FIRST
  await connectDatabase();

  const app = createApp();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Startup failed:", err);
  process.exit(1);
});
