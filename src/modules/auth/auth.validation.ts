import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(5)
    .max(255),

  password: z
    .string()
    .min(8)
    .max(128)
});

// THIS WAS MISSING
export type RegisterInput = z.infer<typeof registerSchema>;
