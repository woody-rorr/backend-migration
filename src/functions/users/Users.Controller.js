// TODO: porting origin Users.Controller + Users.Services (`prompts/api/domains/users/`)
// 부팅 안정성을 위해 stub만 동봉. 실제 구현은 후속 PR에서.
// 위치 주의: src/functions/users/ — users/handler.js의 import 경로와 일치.

const notImplemented = (fn) => async () => {
  const err = new Error(`Users.${fn} not implemented yet`);
  err.code = 'NOT_IMPLEMENTED';
  throw err;
};

export const UsersCtrl = {
  login: notImplemented('login'),
  getMe: notImplemented('getMe'),
  getUserBalance: notImplemented('getUserBalance'),
  getUserDepositHistory: notImplemented('getUserDepositHistory'),
};
