import { resultCode } from '../../common/resultCode.js';
import * as followService from './service.js';

const FOLLOW_LIMIT = { league: 3, team: 6, player: 12 };

function ok(res, data) {
  return res.status(200).type('json').json({ resultCode: resultCode.Success, resultMsg: 'Success', data });
}
function fail(res, code, msg) {
  return res.status(200).type('json').json({ resultCode: code, resultMsg: msg, data: null });
}

export async function getMyFollows(req, res) {
  try {
    const userid = req.user?.id;
    if (!userid) return fail(res, resultCode.validationError, 'userid is required');
    const data = await followService.getMyFollows(userid, req.query?.follow_type);
    return ok(res, data);
  } catch (err) {
    console.error('GET /follow/my error', err);
    return fail(res, resultCode.error, err?.message ?? 'Internal error');
  }
}

export async function putFollowsBatch(req, res) {
  try {
    const userid = req.user?.id;
    if (!userid) return fail(res, resultCode.validationError, 'userid is required');
    const body = req.body ?? {};
    if (Array.isArray(body.league) && body.league.length > FOLLOW_LIMIT.league)
      return fail(res, resultCode.validationError, `리그는 최대 ${FOLLOW_LIMIT.league}개까지 선택 가능합니다.`);
    if (Array.isArray(body.team) && body.team.length > FOLLOW_LIMIT.team)
      return fail(res, resultCode.validationError, `팀은 최대 ${FOLLOW_LIMIT.team}개까지 선택 가능합니다.`);
    if (Array.isArray(body.player) && body.player.length > FOLLOW_LIMIT.player)
      return fail(res, resultCode.validationError, `선수는 최대 ${FOLLOW_LIMIT.player}개까지 선택 가능합니다.`);
    const data = await followService.putFollowsBatch(userid, body);
    return ok(res, data);
  } catch (err) {
    console.error('PUT /follow error', err);
    return fail(res, resultCode.error, err?.message ?? 'Internal error');
  }
}

export async function deleteFollow(req, res) {
  try {
    const userid = req.user?.id;
    if (!userid) return fail(res, resultCode.validationError, 'userid is required');
    const { followType, targetId } = req.params;
    if (!followType || !targetId) return fail(res, resultCode.validationError, 'followType, targetId are required');
    const data = await followService.deleteFollow(userid, { follow_type: followType, target_id: targetId });
    return ok(res, data);
  } catch (err) {
    if (err?.resultCode === resultCode.FollowNotExists) {
      return fail(res, resultCode.FollowNotExists, err.message);
    }
    console.error('DELETE /follow error', err);
    return fail(res, resultCode.error, err?.message ?? 'Internal error');
  }
}
