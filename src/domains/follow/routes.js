import express from 'express';
import * as handler from './handler.js';

const router = express.Router();

/**
 * @openapi
 * /follow/my:
 *   get:
 *     tags: [follow]
 *     summary: 내 팔로우 목록 조회
 *     parameters:
 *       - in: query
 *         name: follow_type
 *         schema: { type: string, enum: [league, team, player] }
 *     responses:
 *       200: { description: OK }
 */
router.get('/my', handler.getMyFollowsHandler);

/**
 * @openapi
 * /follow/list:
 *   get:
 *     tags: [follow]
 *     summary: 팔로우 가능 리스트 조회 (follow 여부 포함)
 *     parameters:
 *       - in: query
 *         name: follow_type
 *         schema: { type: string, enum: [league, team, player], default: team }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: offset
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 */
router.get('/list', handler.getListWithFollowHandler);

/**
 * @openapi
 * /follow/list/teams:
 *   get:
 *     tags: [follow]
 *     summary: 팀 리스트 조회 (follow 여부 포함)
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: offset
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 */
router.get('/list/teams', handler.getTeamsWithFollowHandler);

/**
 * @openapi
 * /follow:
 *   put:
 *     tags: [follow]
 *     summary: 팔로우 일괄 저장 (리그/팀/선수)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               league:
 *                 type: array
 *                 items: { type: object, properties: { target_id: { type: string } } }
 *               team:
 *                 type: array
 *                 items: { type: object, properties: { target_id: { type: string } } }
 *               player:
 *                 type: array
 *                 items: { type: object, properties: { target_id: { type: string } } }
 *     responses:
 *       200: { description: OK }
 */
router.put('/', handler.putFollowsHandler);

/**
 * @openapi
 * /follow/{followType}/{targetId}:
 *   delete:
 *     tags: [follow]
 *     summary: 팔로우 단건 삭제
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
 *       200: { description: OK }
 */
router.delete('/:followType/:targetId', handler.deleteFollowHandler);

export default router;
