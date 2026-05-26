import express from 'express';
import * as handler from './handler.js';
import { authMiddleware } from '../../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /follow/my:
 *   get:
 *     tags: [follow]
 *     summary: 내 팔로우 목록 조회 (JWT)
 *     parameters:
 *       - in: query
 *         name: follow_type
 *         schema: { type: string, enum: [league, team, player] }
 *     responses:
 *       200: { description: OK }
 */
router.get('/my', authMiddleware, handler.getMyFollows);

/**
 * @swagger
 * /follow/list:
 *   get:
 *     tags: [follow]
 *     summary: 팔로우 가능 목록 + 팔로우 상태 (league|team|player)
 *     parameters:
 *       - in: query
 *         name: follow_type
 *         schema: { type: string, enum: [league, team, player] }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: offset
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 */
router.get('/list', authMiddleware, handler.getListWithFollow);

/**
 * @swagger
 * /follow/teams:
 *   get:
 *     tags: [follow]
 *     summary: 팀 목록 + 팔로우 상태
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: offset
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 */
router.get('/teams', authMiddleware, handler.getTeamsWithFollow);

/**
 * @swagger
 * /follow:
 *   put:
 *     tags: [follow]
 *     summary: 팔로우 저장 (단일 타입)
 *     parameters:
 *       - in: query
 *         name: follow_type
 *         schema: { type: string, enum: [league, team, player] }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               follow_type: { type: string, enum: [league, team, player] }
 *               follow:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     target_id: { type: string }
 *     responses:
 *       200: { description: OK }
 */
router.put('/', authMiddleware, handler.putFollows);

/**
 * @swagger
 * /follow/batch:
 *   put:
 *     tags: [follow]
 *     summary: 팔로우 일괄 저장 (온보딩 DONE 시 1회 호출, league/team/player 동시)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               league:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     target_id: { type: string }
 *               team:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     target_id: { type: string }
 *               player:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     target_id: { type: string }
 *     responses:
 *       200: { description: OK }
 */
router.put('/batch', authMiddleware, handler.putFollowsBatch);

/**
 * @swagger
 * /follow/{followType}/{targetId}:
 *   delete:
 *     tags: [follow]
 *     summary: 팔로우 삭제
 *     parameters:
 *       - in: path
 *         name: followType
 *         required: true
 *         schema: { type: string, enum: [league, team, player] }
 *       - in: path
 *         name: targetId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
router.delete('/:followType/:targetId', authMiddleware, handler.deleteFollow);

export default router;
