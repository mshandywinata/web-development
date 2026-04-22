import { z } from "zod";

export const envSchema = z.object({
  PORT: z.string().default("3000").transform(Number),
  DATABASE_URL: z.string(),
  NODE_ENV: z.string().default("development"),
});

export type EnvConfig = z.output<typeof envSchema>;
