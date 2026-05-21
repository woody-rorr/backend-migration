import express from "express";

const router = express.Router();

/**
 * @swagger
 * /ranking/monthly/available-periods:
 *   get:
 *     summary: getAvailableRankingPeriods
 *     description: Migrated from Lambda function getAvailableRankingPeriods
 *     tags:
 *       - ranking
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/monthly/available-periods", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/ranking/monthly/available-periods",
    method: "GET",
    note: "Migrated from Lambda getAvailableRankingPeriods"
  });
});

/**
 * @swagger
 * /ranking/monthly:
 *   get:
 *     summary: getMonthlyRanking
 *     description: Migrated from Lambda function getMonthlyRanking
 *     tags:
 *       - ranking
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/monthly", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/ranking/monthly",
    method: "GET",
    note: "Migrated from Lambda getMonthlyRanking"
  });
});

/**
 * @swagger
 * /ranking/monthly/user:
 *   get:
 *     summary: getMonthlyRankingUserDetail
 *     description: Migrated from Lambda function getMonthlyRankingUserDetail
 *     tags:
 *       - ranking
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/monthly/user", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/ranking/monthly/user",
    method: "GET",
    note: "Migrated from Lambda getMonthlyRankingUserDetail"
  });
});

export default router;
