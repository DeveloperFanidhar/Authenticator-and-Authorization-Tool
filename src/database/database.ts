import mongoose from "mongoose";
import { env } from "../config/env";

export async function connectDatabase() {
  await mongoose.connect(env.MONGODB_URI);
  console.log("MongoDB connected");
}

export async function disconnectDatabase() {
  await mongoose.connection.close();
  console.log("MongoDB disconnected");
}
