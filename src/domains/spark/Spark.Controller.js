// TODO: porting origin Spark.Controller + Spark.Services
// (`prompts/api/domains/spark/business-rules.md` 기준)
// 부팅 안정성을 위해 stub만 동봉. 실제 구현은 후속 PR에서.
//
// stub 호출 패턴 호환:
//   const ret = await Ctrl.fn(...);  ret.getResult() → { resultCode, resultMsg, data }
//   const ret = Ctrl.fn(...);        ret.getResult() → 동일
//   await Ctrl.fn(...).getResult();  → 동일

const notImplemented = (fn) => () => ({
  getResult: () => {
    const payload = {
      resultCode: 'NOT_IMPLEMENTED',
      resultMsg: `Spark.${fn} not implemented yet`,
      data: null,
    };
    return { ...payload, statusCode: 501, body: JSON.stringify(payload) };
  },
});

export const SparkCtrl = {
  getProfile: notImplemented('getProfile'),
  getTransactions: notImplemented('getTransactions'),
  rewardQuizParticipation: notImplemented('rewardQuizParticipation'),
  processMonthlyRankingReward: notImplemented('processMonthlyRankingReward'),
};
