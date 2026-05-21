import mysql from "mysql2/promise";
import { env } from "./env.js";

export const pool = (env.DB_HOST && env.DB_USER)
  ? mysql.createPool({
      host: env.DB_HOST,
      port: Number(env.DB_PORT || 3306),
      user: env.DB_USER,
      password: env.DB_PASS,
      database: env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      enableKeepAlive: true,
    })
  : null;

process.on("SIGTERM", async () => {
  if (pool) await pool.end();
  process.exit(0);
});
