import express from 'express';
import * as handler from './handler.js';

const router = express.Router();

/**
 * @swagger
 * /ranking/periods:
 *   get:
 *     tags: [ranking]
 *     summary: 사용 가능한 랭킹 기간 목록 조회
 *     responses:
 *       200: { description: OK }
 */
router.get('/periods', handler.getRankingPeriods);

/**
 * @swagger
 * /ranking:
 *   get:
 *     tags: [ranking]
 *     summary: 월간 랭킹 조회
 *     parameters:
 *       - in: query
 *         name: period_value
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200: { description: OK }
 */
router.get('/', handler.getRankings);

/**
 * @swagger
 * /ranking/users/{userId}:
 *   get:
 *     tags: [ranking]
 *     summary: 특정 사용자의 월간 랭킹 상세 조회
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: period_value
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
router.get('/users/:userId', handler.getRankingUserDetail);

export default router;
