import { UsersCtrl } from '../../functions/users/Users.Controller.js';

export async function login(req, res, next) {
  try {
    const baseURL = req.headers['origin'];
    const returnURL = `${baseURL}/auth-verification`;
    const ret = await (await UsersCtrl.login(req.body, returnURL)).getResult();
    res.status(ret.statusCode || 200).type('json').send(ret.body ?? JSON.stringify(ret));
  } catch (err) {
    next(err);
  }
}

export async function getMe(req, res, next) {
  try {
    const ret = await UsersCtrl.getMe(req.user).getResult();
    res.status(ret.statusCode || 200).type('json').send(ret.body ?? JSON.stringify(ret));
  } catch (err) {
    next(err);
  }
}

export async function getUserBalance(req, res, next) {
  try {
    const ret = await (await UsersCtrl.getUserBalance(req.body)).getResult();
    res.status(ret.statusCode || 200).type('json').send(ret.body ?? JSON.stringify(ret));
  } catch (err) {
    next(err);
  }
}

export async function getUserDepositHistory(req, res, next) {
  try {
    const ret = await (await UsersCtrl.getUserDepositHistory(req.body)).getResult();
    res.status(ret.statusCode || 200).type('json').send(ret.body ?? JSON.stringify(ret));
  } catch (err) {
    next(err);
  }
}
