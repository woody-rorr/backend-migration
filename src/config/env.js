import { z } from "zod";

const schema = z.object({
  PORT: z.string().default("5012"),
  AWS_REGION: z.string().default("us-east-1"),
  NODE_ENV: z.string().default("production"),
  DATABASE_URL: z.string().optional(),
});

export const env = schema.parse(process.env);
