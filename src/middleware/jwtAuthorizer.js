import jwt from 'jsonwebtoken';
import * as usersController from '../domains/users/controller.js';

const JWT_KEY = process.env.JWT_KEY;

export async function verifyJWT(req, res, next) {
  try {
    const token = req.headers.Authorization || req.headers.authorization;
    if (!token) return res.status(401).type('json').json({ message: 'No token provided' });
    const pureToken = token.replace(/Bearer\s+/i, '').trim();
    const decoded = jwt.verify(pureToken, JWT_KEY);
    const ret = await usersController.verifyJWT(decoded, pureToken);
    if (ret.resultCode !== '0000') {
      return res.status(401).type('json').json({ message: 'Invalid or expired token!' });
    }
    req.user = decoded;
    req.user.follow_onboarding_yn = false;
    next();
  } catch (e) {
    return res.status(401).type('json').json({ message: 'Invalid or expired token!' });
  }
}
