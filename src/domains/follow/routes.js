import express from "express";

const router = express.Router();

/**
 * @swagger
 * /follow/my:
 *   get:
 *     summary: getMyFollows
 *     description: Migrated from Lambda function getMyFollows
 *     tags:
 *       - follow
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/my", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/follow/my",
    method: "GET",
    note: "Migrated from Lambda getMyFollows"
  });
});

/**
 * @swagger
 * /follow/list:
 *   get:
 *     summary: getListWithFollow
 *     description: Migrated from Lambda function getListWithFollow
 *     tags:
 *       - follow
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/list", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/follow/list",
    method: "GET",
    note: "Migrated from Lambda getListWithFollow"
  });
});

/**
 * @swagger
 * /follow/list/teams:
 *   get:
 *     summary: getTeamsWithFollow
 *     description: Migrated from Lambda function getTeamsWithFollow
 *     tags:
 *       - follow
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.get("/list/teams", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/follow/list/teams",
    method: "GET",
    note: "Migrated from Lambda getTeamsWithFollow"
  });
});

/**
 * @swagger
 * /follow:
 *   put:
 *     summary: putFollows
 *     description: Migrated from Lambda function putFollows
 *     tags:
 *       - follow
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.put("/", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/follow",
    method: "PUT",
    note: "Migrated from Lambda putFollows"
  });
});

/**
 * @swagger
 * /follow/{followType}/{targetId}:
 *   delete:
 *     summary: deleteFollow
 *     description: Migrated from Lambda function deleteFollow
 *     tags:
 *       - follow
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.delete("/{followType}/{targetId}", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/follow/{followType}/{targetId}",
    method: "DELETE",
    note: "Migrated from Lambda deleteFollow"
  });
});

export default router;
