import express from 'express';
import * as authController from './controller.js';
import { verifyJWT } from '../../middleware/jwtAuthorizer.js';
import { resultCode } from '../../common/resultCode.js';

const router = express.Router();

/**
 * @openapi
 * /auth/jwt-verify:
 *   get:
 *     tags: [auth]
 *     summary: JWT 유효성 검증
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "{ valid, userid, email, name, picture }"
 *       401:
 *         description: 인증 실패
 */
router.get('/jwt-verify', verifyJWT, (req, res) => {
  try {
    const result = authController.jwtVerify(req.user);
    res.status(200).type('json').json(result);
  } catch (e) {
    console.error('GET /auth/jwt-verify error', e);
    res.status(200).type('json').json({ resultCode: resultCode.error, resultMsg: 'error', data: null });
  }
});

export default router;
