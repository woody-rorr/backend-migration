import * as rankingService from './service.js';
import { resultCode } from '../../common/resultCode.js';

function ok(res, data) {
  return res.status(200).type('json').json({ resultCode: resultCode.Success, resultMsg: 'Success', data });
}
function fail(res, code, msg) {
  return res.status(200).type('json').json({ resultCode: code, resultMsg: msg, data: null });
}

export async function getAvailableRankingPeriods(req, res) {
  try {
    const data = await rankingService.getAvailableRankingPeriods();
    return ok(res, data);
  } catch (err) {
    console.error('GET /ranking/monthly/available-periods error', err);
    return fail(res, resultCode.error, err?.message ?? 'Internal error');
  }
}

export async function getMonthlyRanking(req, res) {
  try {
    const q = req.query ?? {};
    const period_value = q.period_value;
    const page = q.page != null ? parseInt(q.page, 10) : 1;
    const limit = q.limit != null ? parseInt(q.limit, 10) : 10;
    if (Number.isNaN(page) || page < 1) return fail(res, resultCode.validationError, 'page must be >= 1');
    if (Number.isNaN(limit) || limit < 1 || limit > 500) return fail(res, resultCode.validationError, 'limit must be between 1 and 500');
    const current_userid = req.user?.id ?? undefined;
    const data = await rankingService.getMonthlyRanking({ period_value, page, limit, current_userid });
    return ok(res, data);
  } catch (err) {
    console.error('GET /ranking/monthly error', err);
    return fail(res, resultCode.error, err?.message ?? 'Internal error');
  }
}

export async function getMonthlyRankingUserDetail(req, res) {
  try {
    const pathUserid = req.params?.userid;
    const jwtUserid = req.user?.id;
    const userid = pathUserid ?? jwtUserid;
    if (!userid) return fail(res, resultCode.validationError, 'userid is required (path or JWT)');
    const period_value = req.query?.period_value;
    const data = await rankingService.getMonthlyRankingUserDetail(userid, period_value);
    return ok(res, data);
  } catch (err) {
    console.error('GET /ranking/monthly/user error', err);
    return fail(res, resultCode.error, err?.message ?? 'Internal error');
  }
}
