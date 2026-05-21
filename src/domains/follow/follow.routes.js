import express from 'express';
import { formatJSONResponse2 } from '@libs/api-gateway';
import { resultCode } from '@interface/resultCode';
import { FollowCtrl } from './Follow.Controller.js';

const router = express.Router();

function sendLambda(res, lambdaResp) {
  res.status(lambdaResp.statusCode).type('json').send(lambdaResp.body);
}

function validationErrorResp(msg) {
  return formatJSONResponse2({
    resultCode: resultCode.validationError,
    resultMsg: msg,
    data: null,
  });
}

function parseLimitOffset(q) {
  const hasLimit = q.limit != null && q.limit !== '';
  const limit = hasLimit ? parseInt(q.limit, 10) : undefined;
  const offset = q.offset != null && q.offset !== '' ? parseInt(q.offset, 10) : 0;
  return {
    limit: hasLimit && !Number.isNaN(limit) && limit > 0 ? Math.min(limit, 200) : undefined,
    offset: Number.isNaN(offset) ? 0 : Math.max(offset, 0),
  };
}

router.get('/my', async (req, res, next) => {
  try {
    const userid = req.user?.id;
    if (!userid) return sendLambda(res, validationErrorResp('userid is required'));
    const q = req.query ?? {};
    const ret = await FollowCtrl.getMyFollows(userid, q.follow_type);
    sendLambda(res, formatJSONResponse2(ret.getResult()));
  } catch (err) {
    next(err);
  }
});

router.get('/list', async (req, res, next) => {
  try {
    const userid = req.user?.id;
    if (!userid) return sendLambda(res, validationErrorResp('userid is required'));
    const q = req.query ?? {};
    const rawType = String(q.follow_type ?? 'team').toLowerCase().trim();
    const valid = ['league', 'team', 'player'];
    const followType = valid.includes(rawType) ? rawType : 'team';
    const { limit, offset } = parseLimitOffset(q);
    const ret = await FollowCtrl.getListWithFollow(userid, followType, limit, offset);
    sendLambda(res, formatJSONResponse2(ret.getResult()));
  } catch (err) {
    next(err);
  }
});

router.get('/list/teams', async (req, res, next) => {
  try {
    const userid = req.user?.id;
    if (!userid) return sendLambda(res, validationErrorResp('userid is required'));
    const q = req.query ?? {};
    const { limit, offset } = parseLimitOffset(q);
    const ret = await FollowCtrl.getTeamsWithFollow(userid, limit, offset);
    sendLambda(res, formatJSONResponse2(ret.getResult()));
  } catch (err) {
    next(err);
  }
});

function validatePutFollowBatchBody(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, msg: 'Request body is required' };
  }
  const b = body;
  const toItems = (arr) => {
    if (!Array.isArray(arr)) return undefined;
    return arr
      .map((item) => ({ target_id: String(item?.target_id ?? '') }))
      .filter((x) => x.target_id);
  };
  return {
    ok: true,
    data: {
      league: b.league !== undefined ? (toItems(b.league) ?? []) : undefined,
      team: b.team !== undefined ? (toItems(b.team) ?? []) : undefined,
      player: b.player !== undefined ? (toItems(b.player) ?? []) : undefined,
    },
  };
}

router.put('/', async (req, res, next) => {
  try {
    const userid = req.user?.id;
    if (!userid) return sendLambda(res, validationErrorResp('userid is required'));
    const body = req.body ?? {};
    const validated = validatePutFollowBatchBody(body);
    if (!validated.ok) return sendLambda(res, validationErrorResp(validated.msg));
    const { data } = validated;

    const FOLLOW_LIMIT = { league: 3, team: 6, player: 12 };
    if (data.league !== undefined && data.league.length > FOLLOW_LIMIT.league) {
      return sendLambda(res, validationErrorResp(`리그는 최대 ${FOLLOW_LIMIT.league}개까지 선택 가능합니다.`));
    }
    if (data.team !== undefined && data.team.length > FOLLOW_LIMIT.team) {
      return sendLambda(res, validationErrorResp(`팀은 최대 ${FOLLOW_LIMIT.team}개까지 선택 가능합니다.`));
    }
    if (data.player !== undefined && data.player.length > FOLLOW_LIMIT.player) {
      return sendLambda(res, validationErrorResp(`선수는 최대 ${FOLLOW_LIMIT.player}개까지 선택 가능합니다.`));
    }

    const payload = {};
    if (data.league !== undefined) payload.league = data.league;
    if (data.team !== undefined) payload.team = data.team;
    if (data.player !== undefined) payload.player = data.player;
    const ret = await FollowCtrl.putFollowsBatch(userid, payload);
    sendLambda(res, formatJSONResponse2(ret.getResult()));
  } catch (err) {
    next(err);
  }
});

router.delete('/:followType/:targetId', async (req, res, next) => {
  try {
    const userid = req.user?.id;
    const followType = req.params?.followType;
    const targetId = req.params?.targetId;
    if (!userid) return sendLambda(res, validationErrorResp('userid is required'));
    if (!followType || !targetId) {
      return sendLambda(res, validationErrorResp('followType, targetId are required'));
    }
    const ret = await FollowCtrl.deleteFollow(userid, {
      follow_type: followType,
      target_id: targetId,
    });
    sendLambda(res, formatJSONResponse2(ret.getResult()));
  } catch (err) {
    next(err);
  }
});

export default router;
