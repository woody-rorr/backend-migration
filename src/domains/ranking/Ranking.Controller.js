// TODO: porting origin Ranking.Controller + Ranking.Services (`prompts/api/domains/ranking/`)
// 부팅 안정성을 위해 stub만 동봉. 실제 구현은 후속 PR에서.

const notImplemented = (fn) => async () => {
  const err = new Error(`Ranking.${fn} not implemented yet`);
  err.code = 'NOT_IMPLEMENTED';
  throw err;
};

export const RankingCtrl = {
  getAvailableRankingPeriods: notImplemented('getAvailableRankingPeriods'),
  getMonthlyRanking: notImplemented('getMonthlyRanking'),
  getMonthlyRankingUserDetail: notImplemented('getMonthlyRankingUserDetail'),
};
