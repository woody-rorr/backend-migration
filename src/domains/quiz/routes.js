import express from 'express';
import * as handler from './handler.js';
import { verifyJWT } from '../../middleware/jwtAuth.js';
import { verifyAdmin } from '../../middleware/adminAuth.js';

const router = express.Router();

/**
 * @openapi
 * /quiz/problem:
 *   get:
 *     tags: [quiz]
 *     summary: 퀴즈 문제 조회
 *     parameters:
 *       - in: query
 *         name: match_id
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: game_id
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
router.get('/problem', handler.getProblem);

/**
 * @openapi
 * /quiz/answer:
 *   put:
 *     tags: [quiz]
 *     summary: 내 픽 제출/수정/취소
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               match_id: { type: string }
 *               problem_id: { type: string }
 *               game_id: { type: string }
 *               selected_team_id: { type: string }
 *               action: { type: string, enum: [submit, cancel] }
 *     responses:
 *       200: { description: OK }
 */
router.put('/answer', verifyJWT, handler.putQuizAnswer);

/**
 * @openapi
 * /quiz/calendar:
 *   get:
 *     tags: [quiz]
 *     summary: 캘린더 스트릭
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         schema: { type: integer }
 *       - in: query
 *         name: month
 *         required: true
 *         schema: { type: integer }
 *       - in: query
 *         name: today
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
router.get('/calendar', verifyJWT, handler.getCalendar);

/**
 * @openapi
 * /quiz/my-picks:
 *   get:
 *     tags: [quiz]
 *     summary: 내 답변 목록
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period_value
 *         schema: { type: string }
 *       - in: query
 *         name: period_month
 *         schema: { type: string }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: offset
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 */
router.get('/my-picks', verifyJWT, handler.getMyPicks);

/**
 * @openapi
 * /quiz/activity/daily:
 *   get:
 *     tags: [quiz]
 *     summary: 일일 활동
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period_value
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
router.get('/activity/daily', verifyJWT, handler.getDailyActivity);

/**
 * @openapi
 * /quiz/available-problems:
 *   get:
 *     tags: [quiz]
 *     summary: 사용 가능한 문제
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: match_id
 *         schema: { type: string }
 *       - in: query
 *         name: game_id
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
router.get('/available-problems', verifyJWT, handler.getAvailableProblems);

/**
 * @openapi
 * /quiz/admin/manual-game-end:
 *   post:
 *     tags: [quiz]
 *     summary: 퀴즈 수동 종료·채점·스트릭 반영
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               match_id: { type: string }
 *               game_id: { type: string }
 *               game_number: { type: integer }
 *               winner_id: { type: string }
 *     responses:
 *       200: { description: OK }
 */
router.post('/admin/manual-game-end', verifyAdmin, handler.manualQuizGameEnd);

export default router;
