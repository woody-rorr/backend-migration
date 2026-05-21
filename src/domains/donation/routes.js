import express from "express";

const router = express.Router();

/**
 * @swagger
 * /donation/setDonation:
 *   post:
 *     summary: setDonation
 *     description: Migrated from Lambda function setDonation
 *     tags:
 *       - donation
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/setDonation", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/donation/setDonation",
    method: "POST",
    note: "Migrated from Lambda setDonation"
  });
});

/**
 * @swagger
 * /donation/getDonationHistoryByUser:
 *   post:
 *     summary: getDonationHistoryByUser
 *     description: Migrated from Lambda function getDonationHistoryByUser
 *     tags:
 *       - donation
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getDonationHistoryByUser", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/donation/getDonationHistoryByUser",
    method: "POST",
    note: "Migrated from Lambda getDonationHistoryByUser"
  });
});

/**
 * @swagger
 * /donation/getDonationHistoryByPlayer:
 *   post:
 *     summary: getDonationHistoryByPlayer
 *     description: Migrated from Lambda function getDonationHistoryByPlayer
 *     tags:
 *       - donation
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getDonationHistoryByPlayer", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/donation/getDonationHistoryByPlayer",
    method: "POST",
    note: "Migrated from Lambda getDonationHistoryByPlayer"
  });
});

/**
 * @swagger
 * /donation/getDonationHistoryByMatch:
 *   post:
 *     summary: getDonationHistoryByMatch
 *     description: Migrated from Lambda function getDonationHistoryByMatch
 *     tags:
 *       - donation
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getDonationHistoryByMatch", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/donation/getDonationHistoryByMatch",
    method: "POST",
    note: "Migrated from Lambda getDonationHistoryByMatch"
  });
});

/**
 * @swagger
 * /donation/getDonationHistoryByTeam:
 *   post:
 *     summary: getDonationHistoryByTeam
 *     description: Migrated from Lambda function getDonationHistoryByTeam
 *     tags:
 *       - donation
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getDonationHistoryByTeam", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/donation/getDonationHistoryByTeam",
    method: "POST",
    note: "Migrated from Lambda getDonationHistoryByTeam"
  });
});

/**
 * @swagger
 * /donation/getBoostWall:
 *   post:
 *     summary: getBoostWall
 *     description: Migrated from Lambda function getBoostWall
 *     tags:
 *       - donation
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getBoostWall", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/donation/getBoostWall",
    method: "POST",
    note: "Migrated from Lambda getBoostWall"
  });
});

/**
 * @swagger
 * /donation/getDonationScore:
 *   post:
 *     summary: getDonationScore
 *     description: Migrated from Lambda function getDonationScore
 *     tags:
 *       - donation
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getDonationScore", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/donation/getDonationScore",
    method: "POST",
    note: "Migrated from Lambda getDonationScore"
  });
});

/**
 * @swagger
 * /donation/setLikePlayer:
 *   post:
 *     summary: setLikePlayer
 *     description: Migrated from Lambda function setLikePlayer
 *     tags:
 *       - donation
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/setLikePlayer", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/donation/setLikePlayer",
    method: "POST",
    note: "Migrated from Lambda setLikePlayer"
  });
});

/**
 * @swagger
 * /donation/setBoostPlayer:
 *   post:
 *     summary: setBoostPlayer
 *     description: Migrated from Lambda function setBoostPlayer
 *     tags:
 *       - donation
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/setBoostPlayer", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/donation/setBoostPlayer",
    method: "POST",
    note: "Migrated from Lambda setBoostPlayer"
  });
});

/**
 * @swagger
 * /donation/setBoostPlayerForSchedules:
 *   post:
 *     summary: setBoostPlayerForSchedules
 *     description: Migrated from Lambda function setBoostPlayerForSchedules
 *     tags:
 *       - donation
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/setBoostPlayerForSchedules", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/donation/setBoostPlayerForSchedules",
    method: "POST",
    note: "Migrated from Lambda setBoostPlayerForSchedules"
  });
});

export default router;
