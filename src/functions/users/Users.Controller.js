// TODO: porting origin Users.Controller + Users.Services
// (`prompts/api/domains/users/business-rules.md` 기준)
// 부팅 안정성을 위해 stub만 동봉. 실제 구현은 후속 PR.
// 위치 주의: src/functions/users/ — users/handler.js의 import 경로와 일치.

const notImplemented = (fn) => () => ({
  getResult: () => {
    const payload = {
      resultCode: 'NOT_IMPLEMENTED',
      resultMsg: `Users.${fn} not implemented yet`,
      data: null,
    };
    return { ...payload, statusCode: 501, body: JSON.stringify(payload) };
  },
});

export const UsersCtrl = {
  login: notImplemented('login'),
  getMe: notImplemented('getMe'),
  getUserBalance: notImplemented('getUserBalance'),
  getUserDepositHistory: notImplemented('getUserDepositHistory'),
};
