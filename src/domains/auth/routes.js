import express from 'express';
import * as handler from './handler.js';
import { verifyJWT } from '../../middleware/jwtAuth.js';

const router = express.Router();

/**
 * @swagger
 * /auth/jwt-verify:
 *   get:
 *     tags: [auth]
 *     summary: JWT 검증 (Authorization Bearer 토큰)
 *     description: 토큰 유효 시 userid, email 등 반환. 다른 API 호출 전 토큰 형식 테스트용.
 *     responses:
 *       200: { description: OK }
 */
router.get('/jwt-verify', verifyJWT, handler.jwtVerify);

export default router;
