import express from 'express';
import { verifyJWT } from '../../middleware/jwtAuthorizer.js';
import { resultCode } from '../../common/resultCode.js';
import * as SparkCtrl from './controller.js';

const router = express.Router();

/**
 * @openapi
 * /spark/profile:
 *   get:
 *     tags: [spark]
 *     summary: 로그인 유저 프로필 + Spark 정보 조회
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "{ email, displayname, picture, exp, cash, gradeId, gradeName, msgCnt }"
 *       401:
 *         description: 인증 실패
 */
router.get('/profile', verifyJWT, async (req, res) => {
  try {
    const userid = req.user?.id;
    if (!userid) {
      return res.status(200).type('json').json({ resultCode: resultCode.validationError, resultMsg: 'userid is required', data: null });
    }
    const pictureFromToken = req.user?.picture ?? null;
    const ret = await SparkCtrl.getProfile(userid, pictureFromToken);
    return res.status(200).type('json').json(ret);
  } catch (e) {
    console.error('GET /spark/profile error', e);
    return res.status(200).type('json').json({ resultCode: resultCode.error, resultMsg: 'error', data: null });
  }
});

export default router;
