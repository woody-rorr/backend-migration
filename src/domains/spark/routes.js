import express from "express";

const router = express.Router();

/**
 * @swagger
 * /spark/profile:
 *   get:
 *     summary: getProfile
 *     description: Migrated from Lambda function getProfile
 *     tags:
 *       - spark
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/profile", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/spark/profile",
    method: "GET",
    note: "Migrated from Lambda getProfile"
  });
});

/**
 * @swagger
 * /spark/transactions:
 *   get:
 *     summary: getTransactions
 *     description: Migrated from Lambda function getTransactions
 *     tags:
 *       - spark
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/transactions", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/spark/transactions",
    method: "GET",
    note: "Migrated from Lambda getTransactions"
  });
});

/**
 * @swagger
 * /spark/summary:
 *   get:
 *     summary: getSummary
 *     description: Migrated from Lambda function getSummary
 *     tags:
 *       - spark
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/summary", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/spark/summary",
    method: "GET",
    note: "Migrated from Lambda getSummary"
  });
});

/**
 * @swagger
 * /spark/rewards/quiz-participation:
 *   post:
 *     summary: rewardQuizParticipation
 *     description: Migrated from Lambda function rewardQuizParticipation
 *     tags:
 *       - spark
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/rewards/quiz-participation", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/spark/rewards/quiz-participation",
    method: "POST",
    note: "Migrated from Lambda rewardQuizParticipation"
  });
});

/**
 * @swagger
 * /spark/rewards/ranking/process-monthly:
 *   post:
 *     summary: processMonthlyRankingReward
 *     description: Migrated from Lambda function processMonthlyRankingReward
 *     tags:
 *       - spark
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/rewards/ranking/process-monthly", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/spark/rewards/ranking/process-monthly",
    method: "POST",
    note: "Migrated from Lambda processMonthlyRankingReward"
  });
});

export default router;
