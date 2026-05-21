import express from "express";

const router = express.Router();

/**
 * @swagger
 * /common/getVersion:
 *   post:
 *     summary: getVersion
 *     description: Migrated from Lambda function getVersion
 *     tags:
 *       - common
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getVersion", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/common/getVersion",
    method: "POST",
    note: "Migrated from Lambda getVersion"
  });
});

export default router;
