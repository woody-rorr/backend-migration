import express from 'express';
import { verifyJWT } from '../../middleware/jwtAuthorizer.js';
import * as followController from './controller.js';

const router = express.Router();

/**
 * @openapi
 * /follow/my:
 *   get:
 *     tags: [follow]
 *     summary: 내 팔로우 목록 조회
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: follow_type
 *         required: false
 *         schema:
 *           type: string
 *           enum: [league, team, player]
 *         description: 지정 시 해당 타입 배열만 반환 (+ follow_onboarding_yn)
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/my', verifyJWT, followController.getMyFollows);

/**
 * @openapi
 * /follow:
 *   put:
 *     tags: [follow]
 *     summary: 온보딩 팔로우 일괄 저장 (league/team/player) + follow_onboarding_yn=1
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               league:
 *                 type: array
 *                 maxItems: 3
 *                 items: { type: object, properties: { target_id: { type: string } } }
 *               team:
 *                 type: array
 *                 maxItems: 6
 *                 items: { type: object, properties: { target_id: { type: string } } }
 *               player:
 *                 type: array
 *                 maxItems: 12
 *                 items: { type: object, properties: { target_id: { type: string } } }
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/', verifyJWT, followController.putFollowsBatch);

/**
 * @openapi
 * /follow/{followType}/{targetId}:
 *   delete:
 *     tags: [follow]
 *     summary: 단일 팔로우 삭제 + display_order 재정렬
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: followType
 *         required: true
 *         schema: { type: string, enum: [league, team, player] }
 *       - in: path
 *         name: targetId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: OK
 */
router.delete('/:followType/:targetId', verifyJWT, followController.deleteFollow);

export default router;
