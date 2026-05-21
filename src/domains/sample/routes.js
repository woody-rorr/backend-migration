import express from "express";

const router = express.Router();

/**
 * @swagger
 * /sample/hello:
 *   get:
 *     summary: hello
 *     description: Migrated from Lambda function hello
 *     tags:
 *       - sample
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/hello", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/sample/hello",
    method: "GET",
    note: "Migrated from Lambda hello"
  });
});

/**
 * @swagger
 * /sample/hello2:
 *   post:
 *     summary: hello2
 *     description: Migrated from Lambda function hello2
 *     tags:
 *       - sample
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/hello2", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/sample/hello2",
    method: "POST",
    note: "Migrated from Lambda hello2"
  });
});

export default router;
