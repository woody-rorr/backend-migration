import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { env } from "./config/env.js";
import { pool } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Import routers
import sampleRouter from "./domains/sample/routes.js";
import sparkRouter from "./domains/spark/spark.router.js";
import quizRouter from "./domains/quiz/routes.js";

const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend Migration API",
      version: "1.0.0",
      description: "API migrated from Lambda to ECS Express",
    },
    servers: [
      {
        url: `http://localhost:${env.PORT || 5012}`,
        description: "Development server"
      },
      {
        url: "http://mcp-agents-staging-alb:5012",
        description: "Staging ALB"
      }
    ],
  },
  apis: ["./src/domains/*/routes.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("tiny"));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (_, res) => res.json({ status: "ok", server: "backend-migration-api" }));

app.get("/db-check", async (_, res, next) => {
  if (!pool) return res.status(503).json({ db: "not_configured" });
  try {
    const [rows] = await pool.query("SELECT 1 AS ok, NOW() AS ts, DATABASE() AS db");
    res.json({ db: "ok", result: rows[0] });
  } catch (e) { next(e); }
});

// Mount routers
app.use("/sample", sampleRouter);
app.use("/spark", sparkRouter);
app.use("/quiz", quizRouter);

app.use(errorHandler);

const port = parseInt(env.PORT, 10) || 5012;
app.listen(port, () => {
  console.log(`backend-migration-api running on :${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
