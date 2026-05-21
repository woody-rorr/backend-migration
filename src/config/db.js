import pkg from "pg";
import { env } from "./env.js";

const { Pool } = pkg;

export const pool = env.DATABASE_URL
  ? new Pool({
      connectionString: env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30000,
    })
  : null;

process.on("SIGTERM", async () => {
  if (pool) await pool.end();
  process.exit(0);
});
