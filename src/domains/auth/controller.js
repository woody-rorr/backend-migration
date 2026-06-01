import { resultCode } from '../../common/resultCode.js';

export function jwtVerify(user) {
  if (!user) return { resultCode: resultCode.error, resultMsg: 'Invalid token', data: null };
  return {
    resultCode: resultCode.Success,
    resultMsg: 'Valid token',
    data: {
      valid: true,
      userid: user.id,
      email: user.email ?? null,
      name: user.name ?? null,
      picture: user.picture ?? null,
    },
  };
}
