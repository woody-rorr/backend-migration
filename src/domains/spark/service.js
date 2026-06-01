import { pool } from '../../config/db.js';
import { getGradeByExp, getGradeNameByExp } from './constants/grade.config.js';

export async function getProfile(userid, pictureFromToken) {
  const [userRows] = await pool.query(
    'SELECT email, displayname, picture FROM users WHERE userid = ? LIMIT 1',
    [userid]
  );
  const user = userRows[0];
  if (!user) throw new Error('사용자를 찾을 수 없습니다.');
  const [balanceRows] = await pool.query(
    'SELECT exp, cash FROM user_balance WHERE userid = ?',
    [userid]
  );
  const balance = balanceRows[0];
  const exp = balance?.exp ?? 0;
  const picture = pictureFromToken ?? user.picture ?? null;
  const msgCnt = 0; // msgboxes 도메인 stub
  return {
    email: user.email ?? null,
    displayname: user.displayname ?? null,
    picture,
    exp,
    cash: balance?.cash ?? 0,
    gradeId: getGradeByExp(exp),
    gradeName: getGradeNameByExp(exp),
    msgCnt,
  };
}
