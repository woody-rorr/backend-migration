import express from "express";

const router = express.Router();

/**
 * @swagger
 * /schedules/getLeaguesForLoL:
 *   post:
 *     summary: getLeaguesForLoL
 *     description: Migrated from Lambda function getLeaguesForLoL
 *     tags:
 *       - schedules
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getLeaguesForLoL", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/schedules/getLeaguesForLoL",
    method: "POST",
    note: "Migrated from Lambda getLeaguesForLoL"
  });
});

/**
 * @swagger
 * /schedules/getSeriesForLoL:
 *   post:
 *     summary: getSeriesForLoL
 *     description: Migrated from Lambda function getSeriesForLoL
 *     tags:
 *       - schedules
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getSeriesForLoL", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/schedules/getSeriesForLoL",
    method: "POST",
    note: "Migrated from Lambda getSeriesForLoL"
  });
});

/**
 * @swagger
 * /schedules/getTournamentsForLoL:
 *   post:
 *     summary: getTournamentsForLoL
 *     description: Migrated from Lambda function getTournamentsForLoL
 *     tags:
 *       - schedules
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getTournamentsForLoL", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/schedules/getTournamentsForLoL",
    method: "POST",
    note: "Migrated from Lambda getTournamentsForLoL"
  });
});

/**
 * @swagger
 * /schedules/getMatchesForLoL:
 *   post:
 *     summary: getMatchesForLoL
 *     description: Migrated from Lambda function getMatchesForLoL
 *     tags:
 *       - schedules
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getMatchesForLoL", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/schedules/getMatchesForLoL",
    method: "POST",
    note: "Migrated from Lambda getMatchesForLoL"
  });
});

/**
 * @swagger
 * /schedules/getAllMatchesForLoL:
 *   post:
 *     summary: getAllMatchesForLoL
 *     description: Migrated from Lambda function getAllMatchesForLoL
 *     tags:
 *       - schedules
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getAllMatchesForLoL", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/schedules/getAllMatchesForLoL",
    method: "POST",
    note: "Migrated from Lambda getAllMatchesForLoL"
  });
});

export default router;
