import express from 'express';
import * as handler from './handler.js';

const router = express.Router();

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [users]
 *     summary: 구글 OAuth/토큰 기반 로그인 및 JWT 발급
 *     responses:
 *       200: { description: OK }
 */
router.post('/login', handler.login);

/**
 * @swagger
 * /users/me:
 *   get:
 *     tags: [users]
 *     summary: 토큰 기준 현재 유저 정보 조회 (follow_onboarding_yn 포함)
 *     responses:
 *       200: { description: OK }
 */
router.get('/me', handler.getMe);

/**
 * @swagger
 * /users/getUserBalance:
 *   post:
 *     tags: [users]
 *     summary: 유저 잔액 조회
 *     responses:
 *       200: { description: OK }
 */
router.post('/getUserBalance', handler.getUserBalance);

/**
 * @swagger
 * /users/getUserDepositHistory:
 *   post:
 *     tags: [users]
 *     summary: 유저 입금 이력 조회
 *     responses:
 *       200: { description: OK }
 */
router.post('/getUserDepositHistory', handler.getUserDepositHistory);

export default router;
