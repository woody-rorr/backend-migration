import express from "express";

const router = express.Router();

/**
 * @swagger
 * /mainfeed/getFeeds:
 *   post:
 *     summary: getFeeds
 *     description: Migrated from Lambda function getFeeds
 *     tags:
 *       - mainfeed
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getFeeds", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/mainfeed/getFeeds",
    method: "POST",
    note: "Migrated from Lambda getFeeds"
  });
});

/**
 * @swagger
 * /mainfeed/setFeedLike:
 *   post:
 *     summary: setFeedLike
 *     description: Migrated from Lambda function setFeedLike
 *     tags:
 *       - mainfeed
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/setFeedLike", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/mainfeed/setFeedLike",
    method: "POST",
    note: "Migrated from Lambda setFeedLike"
  });
});

export default router;
