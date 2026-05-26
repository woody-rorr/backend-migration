// TODO: porting origin Follow.Controller + Follow.Services
// (`prompts/api/domains/follow/business-rules.md` 기준)
// 부팅 안정성을 위해 stub만 동봉. 실제 구현은 후속 PR.

const notImplemented = (fn) => () => ({
  getResult: () => {
    const payload = {
      resultCode: 'NOT_IMPLEMENTED',
      resultMsg: `Follow.${fn} not implemented yet`,
      data: null,
    };
    return { ...payload, statusCode: 501, body: JSON.stringify(payload) };
  },
});

export const FollowCtrl = {
  getMyFollows: notImplemented('getMyFollows'),
  getListWithFollow: notImplemented('getListWithFollow'),
  getTeamsWithFollow: notImplemented('getTeamsWithFollow'),
  putFollowsBatch: notImplemented('putFollowsBatch'),
  deleteFollow: notImplemented('deleteFollow'),
};
