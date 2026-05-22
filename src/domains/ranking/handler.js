import { RankingCtrl } from './Ranking.Controller.js';
import { resultCode } from '../../common/resultCode.js';

export async function getRankingPeriods(req, res, next) {
  try {
    const ret = await RankingCtrl.getAvailableRankingPeriods();
    const body = ret.getResult();
    return res.status(200).type('json').send(body);
  } catch (err) {
    return next(err);
  }
}

export async function getRankings(req, res, next) {
  try {
    const q = req.query ?? {};
    const period_value = q.period_value;
    const page = q.page != null ? parseInt(q.page, 10) : 1;
    const limit = q.limit != null ? parseInt(q.limit, 10) : 10;
    if (Number.isNaN(page) || page < 1) {
      return res.status(200).type('json').send({
        resultCode: resultCode.validationError,
        resultMsg: 'page must be >= 1',
        data: null,
      });
    }
    if (Number.isNaN(limit) || limit < 1 || limit > 500) {
      return res.status(200).type('json').send({
        resultCode: resultCode.validationError,
        resultMsg: 'limit must be between 1 and 500',
        data: null,
      });
    }
    const current_userid = req.user?.id ?? undefined;
    const ret = await RankingCtrl.getMonthlyRanking({ period_value, page, limit, current_userid });
    const body = ret.getResult();
    return res.status(200).type('json').send(body);
  } catch (err) {
    return next(err);
  }
}

export async function getRankingUserDetail(req, res, next) {
  try {
    const pathUserid = req.params?.userId;
    const jwtUserid = req.user?.id;
    const userid = pathUserid ?? jwtUserid;
    if (!userid) {
      return res.status(200).type('json').send({
        resultCode: resultCode.validationError,
        resultMsg: 'userid is required (path or JWT)',
        data: null,
      });
    }
    const period_value = req.query?.period_value;
    const ret = await RankingCtrl.getMonthlyRankingUserDetail(userid, period_value);
    const body = ret.getResult();
    return res.status(200).type('json').send(body);
  } catch (err) {
    return next(err);
  }
}

export default { getRankingPeriods, getRankings, getRankingUserDetail };
