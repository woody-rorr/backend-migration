import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import * as userService from './service.js';
import * as googleApi from '../../libs/googleApi.js';
import { resultCode } from '../../common/resultCode.js';

const JWT_KEY = process.env.JWT_KEY;

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

export async function login(data, returnURL) {
  let reciveToken = data.token;
  if (data.loginType === 'OAuth') {
    const ret = await googleApi.getAccessTokenbyGoogleAPI(data.token, returnURL);
    if (ret === null) return { resultCode: resultCode.GoogleAPIError, resultMsg: 'error googleAPI', data: null };
    reciveToken = ret.access_token;
  }
  const retUserInfo = await googleApi.getUserbyGoogleAPI(reciveToken);
  if (retUserInfo === null) return { resultCode: resultCode.GoogleAPIError, resultMsg: 'error googleAPI', data: null };
  const result = await userService.selectUser({ email: retUserInfo.email });
  const digest = md5(JSON.stringify(retUserInfo));
  if (result.length < 1) {
    await userService.insertUserAndFreeBalance(data.platformType, retUserInfo, digest);
  } else if (retUserInfo.email === result[0].email && result[0].digest !== digest) {
    await userService.updateUser(data.platformType, retUserInfo, digest);
  }
  const balance = await userService.selectUserBalance({ userid: retUserInfo.id });
  retUserInfo.boost = balance.length < 1 ? 0 : balance[0].cash;
  retUserInfo.payments = { xsollaUseYN: 'N', tossUseYN: 'N' };
  retUserInfo.follow_onboarding_yn = false;
  const expiresIn = data.autoLogin === true ? '30d' : '1d';
  const token = jwt.sign(retUserInfo, JWT_KEY, { subject: 'Chrome Extension JWT', expiresIn, issuer: 'pitch interactive' });
  retUserInfo.jwt = token;
  await userService.insertUserToken(retUserInfo.id, token);
  return { resultCode: resultCode.Success, resultMsg: 'Success', data: retUserInfo };
}

export function getMe(user) {
  return {
    resultCode: resultCode.Success,
    resultMsg: 'Success',
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      boost: user.boost,
      payments: user.payments,
      follow_onboarding_yn: user.follow_onboarding_yn ?? false,
    },
  };
}

export async function verifyJWT(data, pureToken) {
  const userid = String(data.id ?? '');
  const rows = await userService.selectUserToken(userid, pureToken);
  if (rows.length < 1) return { resultCode: resultCode.validationError, resultMsg: 'validation Error', data: null };
  return { resultCode: resultCode.Success, resultMsg: 'Success', data: null };
}
