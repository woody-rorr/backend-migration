import express from 'express';
import * as usersController from './controller.js';
import { verifyJWT } from '../../middleware/jwtAuthorizer.js';
import { resultCode } from '../../common/resultCode.js';

const router = express.Router();

/**
 * @openapi
 * /users/login:
 *   post:
 *     tags: [users]
 *     summary: Google OAuth 로그인 및 JWT 발급
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [platformType, token]
 *             properties:
 *               platformType:
 *                 type: string
 *               loginType:
 *                 type: string
 *                 description: "'OAuth'이면 code→access_token 교환"
 *               token:
 *                 type: string
 *                 description: OAuth code 또는 access_token
 *               autoLogin:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: 로그인 결과 (IGoogleUser + jwt)
 */
router.post('/login', async (req, res) => {
  try {
    const baseURL = req.headers['origin'];
    const returnURL = `${baseURL}/auth-verification`;
    const result = await usersController.login(req.body, returnURL);
    res.status(200).type('json').json(result);
  } catch (e) {
    console.error('POST /users/login error', e);
    res.status(200).type('json').json({ resultCode: resultCode.error, resultMsg: 'error', data: null });
  }
});

/**
 * @openapi
 * /users/me:
 *   get:
 *     tags: [users]
 *     summary: 내 정보 조회
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "{ id, email, name, picture, boost, payments, follow_onboarding_yn }"
 *       401:
 *         description: 인증 실패
 */
router.get('/me', verifyJWT, (req, res) => {
  try {
    const result = usersController.getMe(req.user);
    res.status(200).type('json').json(result);
  } catch (e) {
    console.error('GET /users/me error', e);
    res.status(200).type('json').json({ resultCode: resultCode.error, resultMsg: 'error', data: null });
  }
});

export default router;
