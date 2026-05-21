import express from "express";

const router = express.Router();

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: login
 *     description: Migrated from Lambda function login
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/login", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/users/login",
    method: "POST",
    note: "Migrated from Lambda login"
  });
});

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: getMe
 *     description: Migrated from Lambda function getMe
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/me", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/users/me",
    method: "GET",
    note: "Migrated from Lambda getMe"
  });
});

/**
 * @swagger
 * /users/getUserBalance:
 *   post:
 *     summary: getUserBalance
 *     description: Migrated from Lambda function getUserBalance
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getUserBalance", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/users/getUserBalance",
    method: "POST",
    note: "Migrated from Lambda getUserBalance"
  });
});

/**
 * @swagger
 * /users/getUserDepositHistory:
 *   post:
 *     summary: getUserDepositHistory
 *     description: Migrated from Lambda function getUserDepositHistory
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getUserDepositHistory", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/users/getUserDepositHistory",
    method: "POST",
    note: "Migrated from Lambda getUserDepositHistory"
  });
});

export default router;
