// TODO: porting origin Follow.Controller + Follow.Services (`prompts/api/domains/follow/`)
// 부팅 안정성을 위해 stub만 동봉. 실제 구현은 후속 PR에서.

const notImplemented = (fn) => async () => {
  const err = new Error(`Follow.${fn} not implemented yet`);
  err.code = 'NOT_IMPLEMENTED';
  throw err;
};

export const FollowCtrl = {
  getMyFollows: notImplemented('getMyFollows'),
  getListWithFollow: notImplemented('getListWithFollow'),
  getTeamsWithFollow: notImplemented('getTeamsWithFollow'),
  putFollowsBatch: notImplemented('putFollowsBatch'),
  deleteFollow: notImplemented('deleteFollow'),
};
