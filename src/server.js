import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("tiny"));

app.get("/health", (_, res) => res.json({ status: "ok", server: "backend-migration-api" }));

// 변환된 라우터들은 backend-migration-mcp가 PR로 src/routes/*.js를 추가하면
// 여기서 import → app.use 하도록 확장한다.
// 예: import matchRouter from "./routes/match.js"; app.use("/matches", matchRouter);

app.use(errorHandler);

const port = parseInt(env.PORT, 10);
app.listen(port, () => console.log(`backend-migration-api running on :${port}`));
