import express from "express";

const router = express.Router();

/**
 * @swagger
 * /uploader/getOnetimeURL:
 *   post:
 *     summary: getOnetimeURL
 *     description: Migrated from Lambda function getOnetimeURL
 *     tags:
 *       - uploader
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getOnetimeURL", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/uploader/getOnetimeURL",
    method: "POST",
    note: "Migrated from Lambda getOnetimeURL"
  });
});

/**
 * @swagger
 * /uploader/setUploadCompleted:
 *   post:
 *     summary: setUploadCompleted
 *     description: Migrated from Lambda function setUploadCompleted
 *     tags:
 *       - uploader
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/setUploadCompleted", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/uploader/setUploadCompleted",
    method: "POST",
    note: "Migrated from Lambda setUploadCompleted"
  });
});

export default router;
