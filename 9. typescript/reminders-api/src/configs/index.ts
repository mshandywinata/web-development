import dotenv from "dotenv";
import { fromError } from "zod-validation-error";
import { envSchema } from "../schemas/env.schema";

dotenv.config();

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error(fromError(result.error));
}

export const config = result.data;
