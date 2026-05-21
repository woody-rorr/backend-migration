import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env.js";
import { pool } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("tiny"));

app.get("/health", (_, res) => res.json({ status: "ok", server: "backend-migration-api" }));

app.get("/db-check", async (_, res, next) => {
  if (!pool) return res.status(503).json({ db: "not_configured" });
  try {
    const [rows] = await pool.query("SELECT 1 AS ok, NOW() AS ts, DATABASE() AS db");
    res.json({ db: "ok", result: rows[0] });
  } catch (e) { next(e); }
});

// 변환된 라우터들은 backend-migration-mcp가 PR로 src/domains/<domain>/*.js를 추가하면
// 여기서 import → app.use 하도록 확장한다.

app.use(errorHandler);

const port = parseInt(env.PORT, 10);
app.listen(port, () => console.log(`backend-migration-api running on :${port}`));
