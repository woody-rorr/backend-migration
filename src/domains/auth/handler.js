import { resultCode } from '../../common/resultCode.js';

export async function jwtVerify(req, res, next) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(200).type('json').send({
        resultCode: resultCode.error,
        resultMsg: 'Invalid token',
        data: null,
      });
    }
    return res.status(200).type('json').send({
      resultCode: resultCode.Success,
      resultMsg: 'Valid token',
      data: {
        valid: true,
        userid: user.id,
        email: user.email ?? null,
        name: user.name ?? null,
        picture: user.picture ?? null,
      },
    });
  } catch (err) {
    next(err);
  }
}
