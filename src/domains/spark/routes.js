import express from 'express';
import {
  getProfileHandler,
  getTransactionsHandler,
  getSummaryHandler,
  rewardQuizParticipationHandler,
  processMonthlyRankingRewardHandler,
} from './handler.js';
import { authMiddleware } from '../../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /spark/profile:
 *   get:
 *     tags: [spark]
 *     summary: 사용자 spark 프로필 조회
 *     responses:
 *       200: { description: OK }
 */
router.get('/profile', authMiddleware, getProfileHandler);

/**
 * @swagger
 * /spark/transactions:
 *   get:
 *     tags: [spark]
 *     summary: spark 트랜잭션 내역 조회
 *     responses:
 *       200: { description: OK }
 */
router.get('/transactions', authMiddleware, getTransactionsHandler);

/**
 * @swagger
 * /spark/summary:
 *   get:
 *     tags: [spark]
 *     summary: spark 요약 정보 조회
 *     responses:
 *       200: { description: OK }
 */
router.get('/summary', getSummaryHandler);

/**
 * @swagger
 * /spark/rewards/quiz-participation:
 *   post:
 *     tags: [spark]
 *     summary: 퀴즈 참여 보상 지급
 *     responses:
 *       200: { description: OK }
 */
router.post('/rewards/quiz-participation', authMiddleware, rewardQuizParticipationHandler);

/**
 * @swagger
 * /spark/rewards/ranking/process-monthly:
 *   post:
 *     tags: [spark]
 *     summary: 월간 랭킹 보상 처리
 *     responses:
 *       200: { description: OK }
 */
router.post('/rewards/ranking/process-monthly', processMonthlyRankingRewardHandler);

export default router;
