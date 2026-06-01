import { pool } from '../../config/db.js';

export async function selectUser({ email }) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows;
}

export async function insertUserAndFreeBalance(platformType, user, digest) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query(
      `INSERT INTO users (userid, loginid, email, fullname, displayname, give_name, family_name, picture, locale, verified_email, status, reg_date, last_login_date, reg_type, digest)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '1', now(), now(), ?, ?)`,
      [user.id, user.email, user.email, user.name, user.name, user.given_name, user.family_name, user.picture, user.locale, user.verified_email, platformType, digest]
    );
    await conn.query(
      `INSERT INTO user_balance (userid, point, cash, InsertDate) VALUES (?, 0, ?, now())`,
      [user.id, 0]
    );
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

export async function updateUser(platformType, user, digest) {
  await pool.query(
    `UPDATE users SET loginid=?, email=?, fullname=?, displayname=?, give_name=?, family_name=?, picture=?, locale=?, verified_email=?, status='1', reg_date=now(), last_login_date=now(), reg_type=?, digest=? WHERE userid=?`,
    [user.email, user.email, user.name, user.name, user.given_name, user.family_name, user.picture, user.locale, user.verified_email, platformType, digest, user.id]
  );
}

export async function selectUserBalance({ userid }) {
  const [rows] = await pool.query(
    'SELECT userid, point, cash, insertDate as createdDate, UpdateDate as updatedDate FROM user_balance WHERE userid = ?',
    [userid]
  );
  return rows;
}

export async function insertUserToken(userid, token) {
  await pool.query(
    'INSERT INTO users_auth (userid, user_token, issued_date) VALUES (?, ?, now())',
    [userid, token]
  );
}

export async function selectUserToken(userid, token) {
  const [rows] = await pool.query(
    'SELECT userid, user_token, issued_date FROM users_auth WHERE userid = ? AND user_token = ?',
    [userid, token]
  );
  return rows;
}
