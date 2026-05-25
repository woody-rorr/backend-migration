// TODO: porting origin Spark.Controller + Spark.Services (`prompts/api/domains/spark/`)
// 부팅 안정성을 위해 stub만 동봉. 실제 구현은 다음 PR에서 채워야 함.
//
// 응답 포맷: { resultCode, resultMsg, data } — `prompts/api/_shared/response-format.md`.
// 비즈니스 룰: `prompts/api/domains/spark/business-rules.md`.

const notImplemented = (fn) => async () => {
  const err = new Error(`Spark.${fn} not implemented yet`);
  err.code = 'NOT_IMPLEMENTED';
  throw err;
};

export const SparkCtrl = {
  getProfile: notImplemented('getProfile'),
  getTransactions: notImplemented('getTransactions'),
  rewardQuizParticipation: notImplemented('rewardQuizParticipation'),
  processMonthlyRankingReward: notImplemented('processMonthlyRankingReward'),
};
