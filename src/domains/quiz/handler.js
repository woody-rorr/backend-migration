import { formatJSONResponse2 } from '@libs/api-gateway';
import { loadSecretToCache } from '@configuration/secretLoader';
import { resultCode } from '../../interface/resultCode.js';
import { QuizCtrl } from '../../functions/quiz/Quiz.Controller.js';

function normalizeQuizId(v) {
  if (v == null) return '';
  return String(v).trim();
}

function optionalQuizGameId(v) {
  if (v == null || v === '') return undefined;
  const s = String(v).trim();
  return s === '' ? undefined : s;
}

export async function getProblem(req, res, next) {
  try {
    const match_id = normalizeQuizId(req.query?.match_id);
    const game_id = optionalQuizGameId(req.query?.game_id);
    if (!match_id) {
      const r = formatJSONResponse2({ resultCode: resultCode.validationError, resultMsg: 'match_id is required', data: null });
      return res.status(r.statusCode).type('json').send(r.body);
    }
    const ret = await QuizCtrl.getProblem({ match_id, game_id });
    const r = formatJSONResponse2(ret.getResult());
    return res.status(r.statusCode).type('json').send(r.body);
  } catch (err) {
    next(err);
  }
}

export async function putQuizAnswer(req, res, next) {
  try {
    const userid = req.user?.id != null ? String(req.user.id).trim() : '';
    if (!userid) {
      const r = formatJSONResponse2({ resultCode: resultCode.validationError, resultMsg: 'userid is required', data: null });
      return res.status(r.statusCode).type('json').send(r.body);
    }
    const body = req.body ?? {};
    const { match_id, problem_id, game_id, selected_team_id, action } = body;
    const matchId = normalizeQuizId(match_id ?? problem_id);
    if (!matchId) {
      const r = formatJSONResponse2({ resultCode: resultCode.validationError, resultMsg: 'match_id is required', data: null });
      return res.status(r.statusCode).type('json').send(r.body);
    }
    const gameIdNorm = optionalQuizGameId(game_id);
    const isCancel = action === 'cancel';
    if (!isCancel && (selected_team_id == null || selected_team_id === '')) {
      const r = formatJSONResponse2({ resultCode: resultCode.validationError, resultMsg: '제출·수정 시 selected_team_id is required', data: null });
      return res.status(r.statusCode).type('json').send(r.body);
    }
    const ret = await QuizCtrl.upsertQuizAnswer(userid, matchId, selected_team_id ?? null, gameIdNorm, isCancel ? 'cancel' : action ?? 'submit');
    const r = formatJSONResponse2(ret.getResult());
    return res.status(r.statusCode).type('json').send(r.body);
  } catch (err) {
    next(err);
  }
}

export async function getCalendar(req, res, next) {
  try {
    const userid = req.user?.id;
    if (!userid) {
      const r = formatJSONResponse2({ resultCode: resultCode.validationError, resultMsg: 'userid is required', data: null });
      return res.status(r.statusCode).type('json').send(r.body);
    }
    const q = req.query ?? {};
    const year = q.year != null ? parseInt(q.year, 10) : undefined;
    const month = q.month != null ? parseInt(q.month, 10) : undefined;
    if (year == null || month == null || Number.isNaN(year) || Number.isNaN(month)) {
      const r = formatJSONResponse2({ resultCode: resultCode.validationError, resultMsg: 'year, month are required', data: null });
      return res.status(r.statusCode).type('json').send(r.body);
    }
    const today = q.today ?? undefined;
    const ret = await QuizCtrl.getCalendar({ userid, year, month, today });
    const r = formatJSONResponse2(ret.getResult());
    return res.status(r.statusCode).type('json').send(r.body);
  } catch (err) {
    next(err);
  }
}

export async function getMyPicks(req, res, next) {
  try {
    const rawId = req.user?.id;
    const userid = rawId != null ? String(rawId) : '';
    if (!userid) {
      const r = formatJSONResponse2({ resultCode: resultCode.validationError, resultMsg: 'userid is required', data: null });
      return res.status(r.statusCode).type('json').send(r.body);
    }
    const q = req.query ?? {};
    const limit = q.limit != null ? parseInt(q.limit, 10) : undefined;
    const offset = q.offset != null ? parseInt(q.offset, 10) : undefined;
    const ret = await QuizCtrl.getMyPicks({
      userid,
      period_value: q.period_value,
      period_month: q.period_month,
      limit: Number.isFinite(limit) ? limit : undefined,
      offset: Number.isFinite(offset) ? offset : undefined,
    });
    const r = formatJSONResponse2(ret.getResult());
    return res.status(r.statusCode).type('json').send(r.body);
  } catch (err) {
    next(err);
  }
}

export async function getDailyActivity(req, res, next) {
  try {
    const userid = req.user?.id;
    if (!userid) {
      const r = formatJSONResponse2({ resultCode: resultCode.validationError, resultMsg: 'userid is required', data: null });
      return res.status(r.statusCode).type('json').send(r.body);
    }
    const q = req.query ?? {};
    const ret = await QuizCtrl.getDailyActivity({ userid, period_value: q.period_value });
    const r = formatJSONResponse2(ret.getResult());
    return res.status(r.statusCode).type('json').send(r.body);
  } catch (err) {
    next(err);
  }
}

export async function getAvailableProblems(req, res, next) {
  try {
    const userid = req.user?.id;
    if (!userid) {
      const r = formatJSONResponse2({ resultCode: resultCode.validationError, resultMsg: 'userid is required', data: null });
      return res.status(r.statusCode).type('json').send(r.body);
    }
    const q = req.query ?? {};
    const matchIdRaw = q.match_id;
    const matchIdForApi =
      matchIdRaw != null && String(matchIdRaw).trim() !== '' ? normalizeQuizId(matchIdRaw) : undefined;
    const gameIdForApi = optionalQuizGameId(q.game_id);
    const ret = await QuizCtrl.getAvailableProblems(userid, matchIdForApi, gameIdForApi);
    const r = formatJSONResponse2(ret.getResult());
    return res.status(r.statusCode).type('json').send(r.body);
  } catch (err) {
    next(err);
  }
}

export async function manualQuizGameEnd(req, res, next) {
  try {
    await loadSecretToCache();
    const raw = req.body ?? {};
    const match_id = raw.match_id ?? raw.matchId ?? '';
    const game_id = raw.game_id ?? raw.gameId;
    const game_number = raw.game_number ?? raw.gameNumber;
    const winner_id = raw.winner_id ?? raw.winnerId ?? '';
    console.log('[manualQuizGameEnd] request', {
      match_id,
      game_id: game_id ?? null,
      game_number: game_number ?? null,
      has_winner_id: String(winner_id).trim() !== '',
    });
    const ret = await QuizCtrl.manualQuizGameEnd({
      match_id,
      game_id,
      game_number,
      winner_id,
    });
    const r = formatJSONResponse2(ret.getResult());
    return res.status(r.statusCode).type('json').send(r.body);
  } catch (err) {
    next(err);
  }
}
