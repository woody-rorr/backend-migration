import express from 'express';
import { verifyJWT } from '../../middleware/jwtAuthorizer.js';
import {
  getAvailableRankingPeriods,
  getMonthlyRanking,
  getMonthlyRankingUserDetail,
} from './controller.js';

const router = express.Router();

/**
 * @openapi
 * /ranking/monthly/available-periods:
 *   get:
 *     tags: [ranking]
 *     summary: 사용 가능한 월간 랭킹 기간 목록 (YYYY-MM, 내림차순)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: OK }
 */
router.get('/monthly/available-periods', verifyJWT, getAvailableRankingPeriods);

/**
 * @openapi
 * /ranking/monthly:
 *   get:
 *     tags: [ranking]
 *     summary: 월간 랭킹 조회 (+ 내 랭킹)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period_value
 *         schema: { type: string }
 *         description: YYYY-MM (미지정 시 현재월)
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1, minimum: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10, minimum: 1, maximum: 500 }
 *     responses:
 *       200: { description: 랭킹 목록 + my_* 필드 }
 */
router.get('/monthly', verifyJWT, getMonthlyRanking);

/**
 * @openapi
 * /ranking/monthly/user:
 *   get:
 *     tags: [ranking]
 *     summary: 월간 랭킹 내 상세 (JWT userid 기준)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period_value
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
router.get('/monthly/user', verifyJWT, getMonthlyRankingUserDetail);

/**
 * @openapi
 * /ranking/monthly/user/{userid}:
 *   get:
 *     tags: [ranking]
 *     summary: 월간 랭킹 특정 유저 상세
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: period_value
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
router.get('/monthly/user/:userid', verifyJWT, getMonthlyRankingUserDetail);

export default router;
