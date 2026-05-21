import express from "express";

const router = express.Router();

/**
 * @swagger
 * /teams/setTeams:
 *   post:
 *     summary: setTeams
 *     description: Migrated from Lambda function setTeams
 *     tags:
 *       - teams
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/setTeams", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/teams/setTeams",
    method: "POST",
    note: "Migrated from Lambda setTeams"
  });
});

/**
 * @swagger
 * /teams/getTeams:
 *   post:
 *     summary: getTeams
 *     description: Migrated from Lambda function getTeams
 *     tags:
 *       - teams
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getTeams", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/teams/getTeams",
    method: "POST",
    note: "Migrated from Lambda getTeams"
  });
});

export default router;
