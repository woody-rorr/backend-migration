import express from 'express';
import {
  getProfileHandler,
  getTransactionsHandler,
  getSummaryHandler,
  rewardQuizParticipationHandler,
  processMonthlyRankingRewardHandler,
} from './spark.handler.js';
import { authMiddleware } from '../../middleware/auth.js';

const router = express.Router();

router.get('/profile', authMiddleware, getProfileHandler);
router.get('/transactions', authMiddleware, getTransactionsHandler);
router.get('/summary', getSummaryHandler);
router.post('/rewards/quiz-participation', authMiddleware, rewardQuizParticipationHandler);
router.post('/rewards/ranking/process-monthly', processMonthlyRankingRewardHandler);

export default router;
