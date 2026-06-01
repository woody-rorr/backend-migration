import { pool } from '../../config/db.js';
import { resultCode } from '../../common/resultCode.js';

const FOLLOW_TYPES = ['league', 'team', 'player'];

export async function getMyFollows(userid, followType) {
  let sql = `SELECT f.idx, f.follow_type, f.target_id, f.display_order, f.created_date, f.updated_date,
      t.name AS team_name, t.slug AS team_slug, t.image_url AS team_image, t.boostYN AS team_boostYN,
      l.name AS league_name, l.slug AS league_slug, l.image_url AS league_image, l.boostYN AS league_boostYN,
      p.first_name, p.last_name, p.nickname, p.slug AS player_slug, p.image_url AS player_image, p.boostYN AS player_boostYN
    FROM follow f
    LEFT JOIN teams t ON f.follow_type = 'team' AND t.id = f.target_id
    LEFT JOIN leagues l ON f.follow_type = 'league' AND l.id = f.target_id
    LEFT JOIN players p ON f.follow_type = 'player' AND p.id = f.target_id
    WHERE f.userid = ?`;
  const params = [userid];
  if (followType) {
    sql += ` AND f.follow_type = ?`;
    params.push(followType);
  }
  sql += ` ORDER BY f.display_order ASC, f.created_date ASC`;

  const [rows] = await pool.query(sql, params);

  const leagues = [];
  const teams = [];
  const players = [];

  for (const row of rows) {
    const base = {
      idx: Number(row.idx),
      target_id: row.target_id,
      display_order: String(row.display_order),
      created_date: row.created_date,
      updated_date: row.updated_date,
      follow_yn: true,
    };
    if (row.follow_type === 'team') {
      teams.push({ ...base, name: row.team_name ?? undefined, slug: row.team_slug ?? undefined, image_url: row.team_image ?? undefined, boostYN: row.team_boostYN === 'Y' ? 'Y' : 'N' });
    } else if (row.follow_type === 'league') {
      leagues.push({ ...base, name: row.league_name ?? undefined, slug: row.league_slug ?? undefined, image_url: row.league_image ?? undefined, boostYN: row.league_boostYN === 'Y' ? 'Y' : 'N' });
    } else if (row.follow_type === 'player') {
      const firstName = row.first_name ?? null;
      const lastName = row.last_name ?? null;
      const fullName = (firstName || lastName) ? [firstName, lastName].filter(Boolean).join(' ').trim() : null;
      const nickname = row.nickname ?? null;
      const name = fullName || nickname || undefined;
      players.push({ ...base, name, slug: row.player_slug ?? undefined, image_url: row.player_image ?? undefined, boostYN: row.player_boostYN === 'Y' ? 'Y' : 'N', first_name: firstName, last_name: lastName, fullName, nickname });
    }
  }

  const [userRows] = await pool.query(`SELECT follow_onboarding_yn FROM users WHERE userid = ?`, [userid]);
  const follow_onboarding_yn = userRows.length > 0 && Number(userRows[0].follow_onboarding_yn) === 1;

  if (followType === 'league') return { follow_onboarding_yn, leagues };
  if (followType === 'team') return { follow_onboarding_yn, teams };
  if (followType === 'player') return { follow_onboarding_yn, players };
  return { follow_onboarding_yn, leagues, teams, players };
}

export async function putFollowsBatch(userid, body) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const result = { success: true, message: '팔로우가 저장되었습니다.', follow_onboarding_yn: true };

    for (const type of FOLLOW_TYPES) {
      const items = body[type];
      if (items === undefined) continue;

      const typeResult = { success: true, follow_type: type, total: items.length, created: 0, updated: 0, deleted: 0, results: [] };
      const targetIds = [];

      for (let i = 0; i < items.length; i++) {
        const target_id = items[i].target_id;
        const display_order = i + 1;
        targetIds.push(target_id);

        const [existing] = await conn.query(
          `SELECT idx FROM follow WHERE userid = ? AND follow_type = ? AND target_id = ?`,
          [userid, type, target_id]
        );

        if (existing.length > 0) {
          await conn.query(
            `UPDATE follow SET display_order = ?, updated_date = NOW() WHERE idx = ?`,
            [display_order, existing[0].idx]
          );
          typeResult.updated += 1;
          typeResult.results.push({ target_id, action: 'updated', idx: Number(existing[0].idx), display_order });
        } else {
          const [ins] = await conn.query(
            `INSERT INTO follow (userid, follow_type, target_id, display_order, created_date, updated_date) VALUES (?, ?, ?, ?, NOW(), NOW())`,
            [userid, type, target_id, display_order]
          );
          typeResult.created += 1;
          typeResult.results.push({ target_id, action: 'created', idx: Number(ins.insertId), display_order });
        }
      }

      const [allRows] = await conn.query(
        `SELECT idx, target_id FROM follow WHERE userid = ? AND follow_type = ?`,
        [userid, type]
      );
      for (const row of allRows) {
        if (!targetIds.includes(row.target_id)) {
          await conn.query(`DELETE FROM follow WHERE idx = ?`, [row.idx]);
          typeResult.deleted += 1;
        }
      }

      result[type] = typeResult;
    }

    await conn.query(`UPDATE users SET follow_onboarding_yn = 1 WHERE userid = ?`, [userid]);

    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export async function deleteFollow(userid, { follow_type, target_id }) {
  const [found] = await pool.query(
    `SELECT idx FROM follow WHERE userid = ? AND follow_type = ? AND target_id = ?`,
    [userid, follow_type, target_id]
  );
  if (found.length === 0) {
    const err = new Error('팔로우한 항목을 찾을 수 없습니다.');
    err.resultCode = resultCode.FollowNotExists;
    throw err;
  }

  await pool.query(`DELETE FROM follow WHERE idx = ?`, [found[0].idx]);

  const [remaining] = await pool.query(
    `SELECT idx, display_order FROM follow WHERE userid = ? AND follow_type = ? ORDER BY display_order ASC`,
    [userid, follow_type]
  );
  for (let i = 0; i < remaining.length; i++) {
    const expected = i + 1;
    if (remaining[i].display_order !== expected) {
      await pool.query(`UPDATE follow SET display_order = ? WHERE idx = ?`, [expected, remaining[i].idx]);
    }
  }

  return { success: true, message: '팔로우가 삭제되었습니다.', deleted: { follow_type, target_id } };
}
