import express from "express";

const router = express.Router();

/**
 * @swagger
 * /webHooks/sendSystemMsg:
 *   post:
 *     summary: sendSystemMsg
 *     description: Migrated from Lambda function sendSystemMsg
 *     tags:
 *       - webHooks
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/sendSystemMsg", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/webHooks/sendSystemMsg",
    method: "POST",
    note: "Migrated from Lambda sendSystemMsg"
  });
});

export default router;
