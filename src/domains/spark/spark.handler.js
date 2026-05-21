import { resultCode } from '@interface/resultCode';
import { SparkCtrl } from './Spark.Controller.js';

function normalizeQuizParticipationBody(raw) {
  const body = typeof raw === 'string' ? (raw ? JSON.parse(raw) : {}) : raw ?? {};
  const userid = body.userid ?? body.userId ?? '';
  const match_id = body.match_id ?? body.matchId ?? body.problem_id ?? body.problemId ?? '';
  const game_id = body.game_id ?? body.gameId ?? undefined;
  const gid = game_id != null && String(game_id).trim() !== '' ? String(game_id).trim() : null;
  return { userid, match_id, game_id: gid };
}

export async function getProfileHandler(req, res, next) {
  try {
    const userid = req.user?.id;
    if (!userid) {
      return res.status(200).type('json').send({
        resultCode: resultCode.validationError,
        resultMsg: 'userid is required',
        data: null,
      });
    }
    const pictureFromToken = req.user?.picture ?? null;
    const ret = await SparkCtrl.getProfile(userid, pictureFromToken);
    return res.status(200).type('json').send(ret.getResult());
  } catch (err) {
    return next(err);
  }
}

export async function getTransactionsHandler(req, res, next) {
  try {
    const userid = req.user?.id;
    if (!userid) {
      return res.status(200).type('json').send({
        resultCode: resultCode.validationError,
        resultMsg: 'userid is required',
        data: null,
      });
    }
    const q = req.query ?? {};
    const ret = await SparkCtrl.getTransactions(
      userid,
      q.source_type,
      q.start_date,
      q.end_date,
      q.limit != null ? Number(q.limit) : undefined,
      q.offset != null ? Number(q.offset) : undefined
    );
    return res.status(200).type('json').send(ret.getResult());
  } catch (err) {
    return next(err);
  }
}

export async function getSummaryHandler(req, res, next) {
  try {
    return res.status(200).type('json').send({
      resultCode: resultCode.error,
      resultMsg: 'getSummary is not implemented',
      data: null,
    });
  } catch (err) {
    return next(err);
  }
}

export async function rewardQuizParticipationHandler(req, res, next) {
  try {
    const userid = req.user?.id;
    const raw = req.body ?? {};
    const body = normalizeQuizParticipationBody(raw);
    const match_id = body.match_id;
    if (!userid) {
      return res.status(200).type('json').send({
        resultCode: resultCode.validationError,
        resultMsg: 'userid is required',
        data: null,
      });
    }
    if (!match_id) {
      return res.status(200).type('json').send({
        resultCode: resultCode.validationError,
        resultMsg: 'match_id is required',
        data: null,
      });
    }
    const ret = await SparkCtrl.rewardQuizParticipation({ userid, match_id, game_id: body.game_id });
    return res.status(200).type('json').send(ret.getResult());
  } catch (err) {
    return next(err);
  }
}

export async function processMonthlyRankingRewardHandler(req, res, next) {
  try {
    const body = req.body ?? {};
    const period_value = body.period_value ?? body.periodValue ?? '';
    if (!period_value) {
      return res.status(200).type('json').send({
        resultCode: resultCode.validationError,
        resultMsg: 'period_value is required (e.g. "2026-02")',
        data: null,
      });
    }
    const ret = await SparkCtrl.processMonthlyRankingReward({ period_value });
    return res.status(200).type('json').send(ret.getResult());
  } catch (err) {
    return next(err);
  }
}
