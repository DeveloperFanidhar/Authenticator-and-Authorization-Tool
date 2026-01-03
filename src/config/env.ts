import { z } from "zod";
import { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),

  PORT: z.string().default("3000").transform(Number),

  MONGODB_URI: z.string().min(1),

  JWT_ACCESS_SECRET: z.string().min(1),
  JWT_REFRESH_SECRET: z.string().min(1),

  JWT_ACCESS_TTL: z
    .union([z.string(), z.number()])
    .default("15m")
    .transform((v) => v as SignOptions["expiresIn"]),

  JWT_REFRESH_TTL: z
    .union([z.string(), z.number()])
    .default("7d")
    .transform((v) => v as SignOptions["expiresIn"]),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment configuration:");
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
