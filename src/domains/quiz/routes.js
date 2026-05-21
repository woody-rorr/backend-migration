import express from "express";

const router = express.Router();

/**
 * @swagger
 * /quiz/problem:
 *   get:
 *     summary: getQuizProblem
 *     description: Migrated from Lambda function getQuizProblem
 *     tags:
 *       - quiz
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/problem", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/quiz/problem",
    method: "GET",
    note: "Migrated from Lambda getQuizProblem"
  });
});

/**
 * @swagger
 * /quiz/answer:
 *   put:
 *     summary: putQuizAnswer
 *     description: Migrated from Lambda function putQuizAnswer
 *     tags:
 *       - quiz
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.put("/answer", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/quiz/answer",
    method: "PUT",
    note: "Migrated from Lambda putQuizAnswer"
  });
});

/**
 * @swagger
 * /quiz/calendar:
 *   get:
 *     summary: getQuizCalendar
 *     description: Migrated from Lambda function getQuizCalendar
 *     tags:
 *       - quiz
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/calendar", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/quiz/calendar",
    method: "GET",
    note: "Migrated from Lambda getQuizCalendar"
  });
});

/**
 * @swagger
 * /quiz/my-picks:
 *   get:
 *     summary: getQuizMyPicks
 *     description: Migrated from Lambda function getQuizMyPicks
 *     tags:
 *       - quiz
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/my-picks", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/quiz/my-picks",
    method: "GET",
    note: "Migrated from Lambda getQuizMyPicks"
  });
});

/**
 * @swagger
 * /quiz/activity/daily:
 *   get:
 *     summary: getQuizDailyActivity
 *     description: Migrated from Lambda function getQuizDailyActivity
 *     tags:
 *       - quiz
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/activity/daily", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/quiz/activity/daily",
    method: "GET",
    note: "Migrated from Lambda getQuizDailyActivity"
  });
});

/**
 * @swagger
 * /quiz/available-problems:
 *   get:
 *     summary: getQuizAvailableProblems
 *     description: Migrated from Lambda function getQuizAvailableProblems
 *     tags:
 *       - quiz
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/available-problems", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/quiz/available-problems",
    method: "GET",
    note: "Migrated from Lambda getQuizAvailableProblems"
  });
});

/**
 * @swagger
 * /quiz/admin/manual-game-end:
 *   post:
 *     summary: postQuizManualGameEnd
 *     description: Migrated from Lambda function postQuizManualGameEnd
 *     tags:
 *       - quiz
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/admin/manual-game-end", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/quiz/admin/manual-game-end",
    method: "POST",
    note: "Migrated from Lambda postQuizManualGameEnd"
  });
});

/**
 * @swagger
 * /quiz/open-live-quiz:
 *   get:
 *     summary: getQuizOpenLiveQuiz
 *     description: Migrated from Lambda function getQuizOpenLiveQuiz
 *     tags:
 *       - quiz
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/open-live-quiz", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/quiz/open-live-quiz",
    method: "GET",
    note: "Migrated from Lambda getQuizOpenLiveQuiz"
  });
});

export default router;
