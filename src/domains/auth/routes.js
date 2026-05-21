import express from "express";

const router = express.Router();

/**
 * @swagger
 * /auth/jwt-verify:
 *   get:
 *     summary: jwtVerify
 *     description: Migrated from Lambda function jwtVerify
 *     tags:
 *       - auth
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/jwt-verify", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/auth/jwt-verify",
    method: "GET",
    note: "Migrated from Lambda jwtVerify"
  });
});

export default router;
