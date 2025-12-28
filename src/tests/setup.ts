import mongoose from "mongoose";
import dotenv from "dotenv";
import { createApp } from "../app";

dotenv.config({ path: ".env" });

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error(
    "MONGODB_URI is not defined. Please set it in your .env file."
  );
}

export const app = createApp();

beforeAll(async () => {
  await mongoose.connect(mongoUri, {
    autoIndex: true
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
