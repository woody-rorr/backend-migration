import { FollowCtrl } from './Follow.Controller.js';
import { resultCode } from '../../interface/resultCode.js';

function formatJSONResponse2(payload) {
  return { statusCode: 200, body: JSON.stringify(payload) };
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

function validatePutFollowBody(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, msg: 'Request body is required' };
  }
  const b = body;
  if (!Array.isArray(b.follow)) {
    return { ok: false, msg: 'follow array is required' };
  }
  const follow = b.follow;
  for (let i = 0; i < follow.length; i++) {
    const item = follow[i];
    if (!item || typeof item !== 'object' || typeof item.target_id !== 'string') {
      return { ok: false, msg: `follow[${i}].target_id is required (string)` };
    }
  }
  const follow_type = b.follow_type;
  const validTypes = ['league', 'team', 'player'];
  if (follow_type != null && (typeof follow_type !== 'string' || !validTypes.includes(follow_type.trim().toLowerCase()))) {
    return { ok: false, msg: 'follow_type must be league, team, or player' };
  }
  return {
    ok: true,
    data: {
      follow_type: follow_type != null ? String(follow_type).trim().toLowerCase() : undefined,
      follow: follow.map((item) => ({ target_id: item.target_id })),
    },
  };
}

function validatePutFollowBatchBody(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, msg: 'Request body is required' };
  }
  const b = body;
  const toItems = (arr) => {
    if (!Array.isArray(arr)) return undefined;
    return arr
      .map((item) => {
        const o = item;
        return { target_id: String(o?.target_id ?? '') };
      })
      .filter((x) => x.target_id);
  };
  return {
    ok: true,
    data: {
      league: b.league !== undefined ? toItems(b.league) ?? [] : undefined,
      team: b.team !== undefined ? toItems(b.team) ?? [] : undefined,
      player: b.player !== undefined ? toItems(b.player) ?? [] : undefined,
    },
  };
}

export async function getMyFollowsHandler(req, res, next) {
  try {
    const userid = req.user?.id;
    if (!userid) {
      return res.status(200).type('json').send(JSON.stringify({
        resultCode: resultCode.validationError,
        resultMsg: 'userid is required',
        data: null,
      }));
    }
    const q = req.query ?? {};
    const ret = await FollowCtrl.getMyFollows(userid, q.follow_type);
    const r = formatJSONResponse2(ret.getResult());
    return res.status(r.statusCode).type('json').send(r.body);
  } catch (err) {
    next(err);
  }
}

export async function getListWithFollowHandler(req, res, next) {
  try {
    const userid = req.user?.id;
    if (!userid) {
      return res.status(200).type('json').send(JSON.stringify({
        resultCode: resultCode.validationError,
        resultMsg: 'userid is required',
        data: null,
      }));
    }
    const q = req.query ?? {};
    const rawType = (q.follow_type ?? 'team').toLowerCase().trim();
    const valid = ['league', 'team', 'player'];
    const followType = valid.includes(rawType) ? rawType : 'team';
    const { limit, offset } = parseLimitOffset(q);
    const ret = await FollowCtrl.getListWithFollow(userid, followType, limit, offset);
    const r = formatJSONResponse2(ret.getResult());
    return res.status(r.statusCode).type('json').send(r.body);
  } catch (err) {
    next(err);
  }
}

export async function getTeamsWithFollowHandler(req, res, next) {
  try {
    const userid = req.user?.id;
    if (!userid) {
      return res.status(200).type('json').send(JSON.stringify({
        resultCode: resultCode.validationError,
        resultMsg: 'userid is required',
        data: null,
      }));
    }
    const q = req.query ?? {};
    const { limit, offset } = parseLimitOffset(q);
    const ret = await FollowCtrl.getTeamsWithFollow(userid, limit, offset);
    const r = formatJSONResponse2(ret.getResult());
    return res.status(r.statusCode).type('json').send(r.body);
  } catch (err) {
    next(err);
  }
}

export async function putFollowsHandler(req, res, next) {
  try {
    const userid = req.user?.id;
    if (!userid) {
      return res.status(200).type('json').send(JSON.stringify({
        resultCode: resultCode.validationError,
        resultMsg: 'userid is required',
        data: null,
      }));
    }
    const body = req.body ?? {};
    const validated = validatePutFollowBatchBody(body);
    if (!validated.ok) {
      return res.status(200).type('json').send(JSON.stringify({
        resultCode: resultCode.validationError,
        resultMsg: validated.msg,
        data: null,
      }));
    }
    const { data } = validated;

    const FOLLOW_LIMIT = { league: 3, team: 6, player: 12 };
    if (data.league !== undefined && data.league.length > FOLLOW_LIMIT.league) {
      return res.status(200).type('json').send(JSON.stringify({
        resultCode: resultCode.validationError,
        resultMsg: `리그는 최대 ${FOLLOW_LIMIT.league}개까지 선택 가능합니다.`,
        data: null,
      }));
    }
    if (data.team !== undefined && data.team.length > FOLLOW_LIMIT.team) {
      return res.status(200).type('json').send(JSON.stringify({
        resultCode: resultCode.validationError,
        resultMsg: `팀은 최대 ${FOLLOW_LIMIT.team}개까지 선택 가능합니다.`,
        data: null,
      }));
    }
    if (data.player !== undefined && data.player.length > FOLLOW_LIMIT.player) {
      return res.status(200).type('json').send(JSON.stringify({
        resultCode: resultCode.validationError,
        resultMsg: `선수는 최대 ${FOLLOW_LIMIT.player}개까지 선택 가능합니다.`,
        data: null,
      }));
    }

    const payload = {};
    if (data.league !== undefined) payload.league = data.league;
    if (data.team !== undefined) payload.team = data.team;
    if (data.player !== undefined) payload.player = data.player;
    const ret = await FollowCtrl.putFollowsBatch(userid, payload);
    const r = formatJSONResponse2(ret.getResult());
    return res.status(r.statusCode).type('json').send(r.body);
  } catch (err) {
    next(err);
  }
}

export async function deleteFollowHandler(req, res, next) {
  try {
    const userid = req.user?.id;
    const followType = req.params?.followType;
    const targetId = req.params?.targetId;
    if (!userid) {
      return res.status(200).type('json').send(JSON.stringify({
        resultCode: resultCode.validationError,
        resultMsg: 'userid is required',
        data: null,
      }));
    }
    if (!followType || !targetId) {
      return res.status(200).type('json').send(JSON.stringify({
        resultCode: resultCode.validationError,
        resultMsg: 'followType, targetId are required',
        data: null,
      }));
    }
    const ret = await FollowCtrl.deleteFollow(userid, {
      follow_type: followType,
      target_id: targetId,
    });
    const r = formatJSONResponse2(ret.getResult());
    return res.status(r.statusCode).type('json').send(r.body);
  } catch (err) {
    next(err);
  }
}
