import express from "express";

const router = express.Router();

/**
 * @swagger
 * /msgboxes/getMsgList:
 *   post:
 *     summary: getMsgList
 *     description: Migrated from Lambda function getMsgList
 *     tags:
 *       - msgboxes
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getMsgList", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/msgboxes/getMsgList",
    method: "POST",
    note: "Migrated from Lambda getMsgList"
  });
});

/**
 * @swagger
 * /msgboxes/getNewMsgCount:
 *   post:
 *     summary: getNewMsgCount
 *     description: Migrated from Lambda function getNewMsgCount
 *     tags:
 *       - msgboxes
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getNewMsgCount", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/msgboxes/getNewMsgCount",
    method: "POST",
    note: "Migrated from Lambda getNewMsgCount"
  });
});

/**
 * @swagger
 * /msgboxes/setMsgReadState:
 *   post:
 *     summary: setMsgReadState
 *     description: Migrated from Lambda function setMsgReadState
 *     tags:
 *       - msgboxes
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/setMsgReadState", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/msgboxes/setMsgReadState",
    method: "POST",
    note: "Migrated from Lambda setMsgReadState"
  });
});

/**
 * @swagger
 * /msgboxes/setMsgWatchState:
 *   post:
 *     summary: setMsgWatchState
 *     description: Migrated from Lambda function setMsgWatchState
 *     tags:
 *       - msgboxes
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/setMsgWatchState", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/msgboxes/setMsgWatchState",
    method: "POST",
    note: "Migrated from Lambda setMsgWatchState"
  });
});

export default router;
