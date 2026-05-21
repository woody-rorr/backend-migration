import express from "express";

const router = express.Router();

/**
 * @swagger
 * /search:
 *   get:
 *     summary: search
 *     description: Migrated from Lambda function search
 *     tags:
 *       - search
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/search",
    method: "GET",
    note: "Migrated from Lambda search"
  });
});

export default router;
