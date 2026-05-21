import express from "express";

const router = express.Router();

/**
 * @swagger
 * /event:
 *   get:
 *     summary: getEvent
 *     description: Migrated from Lambda function getEvent
 *     tags:
 *       - event
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/event",
    method: "GET",
    note: "Migrated from Lambda getEvent"
  });
});

export default router;
