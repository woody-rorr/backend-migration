// TODO: porting origin Ranking.Controller + Ranking.Services
// (`prompts/api/domains/ranking/business-rules.md` 기준)
// 부팅 안정성을 위해 stub만 동봉. 실제 구현은 후속 PR.

const notImplemented = (fn) => () => ({
  getResult: () => {
    const payload = {
      resultCode: 'NOT_IMPLEMENTED',
      resultMsg: `Ranking.${fn} not implemented yet`,
      data: null,
    };
    return { ...payload, statusCode: 501, body: JSON.stringify(payload) };
  },
});

export const RankingCtrl = {
  getAvailableRankingPeriods: notImplemented('getAvailableRankingPeriods'),
  getMonthlyRanking: notImplemented('getMonthlyRanking'),
  getMonthlyRankingUserDetail: notImplemented('getMonthlyRankingUserDetail'),
};
