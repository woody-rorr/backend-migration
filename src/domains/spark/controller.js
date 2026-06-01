import { resultCode } from '../../common/resultCode.js';
import * as service from './service.js';

export async function getProfile(userid, pictureFromToken) {
  try {
    const data = await service.getProfile(userid, pictureFromToken);
    return { resultCode: resultCode.Success, resultMsg: 'Success', data };
  } catch (error) {
    return { resultCode: resultCode.error, resultMsg: error.message, data: null };
  }
}
