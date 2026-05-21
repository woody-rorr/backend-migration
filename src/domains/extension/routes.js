import express from "express";

const router = express.Router();

/**
 * @swagger
 * /extension/live2d-character:
 *   get:
 *     summary: getLive2dCharacter
 *     description: Migrated from Lambda function getLive2dCharacter
 *     tags:
 *       - extension
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/live2d-character", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/extension/live2d-character",
    method: "GET",
    note: "Migrated from Lambda getLive2dCharacter"
  });
});

/**
 * @swagger
 * /extension/live2d-character:
 *   post:
 *     summary: putLive2dCharacter
 *     description: Migrated from Lambda function putLive2dCharacter
 *     tags:
 *       - extension
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/live2d-character", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/extension/live2d-character",
    method: "POST",
    note: "Migrated from Lambda putLive2dCharacter"
  });
});

export default router;
