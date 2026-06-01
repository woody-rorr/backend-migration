import { pool } from '../../config/db.js';
import { getGradeByExp, getGradeNameByExp } from '../spark/constants/grade.config.js';
import { calculateRankingReward, getRankingGrade } from './constants/ranking-reward.config.js';

function getCurrentPeriodValue() {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const year = kst.getUTCFullYear();
  const month = String(kst.getUTCMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

function meetsMinWinStreakForRanking(longest, current) {
  return (longest ?? 0) >= 1 || (current ?? 0) >= 1;
}

async function buildSortedRows(periodValue) {
  const [streakRows] = await pool.query(
    'SELECT userid, current_win_streak, longest_win_streak, longest_win_streak_achieved_at, longest_win_streak_started_at FROM quiz_user_streaks_monthly WHERE period_value = ?',
    [periodValue],
  );
  const byUser = new Map();
  for (const row of streakRows) {
    if (!byUser.has(row.userid)) byUser.set(row.userid, row);
  }
  const dedupedRows = Array.from(byUser.values());
  const allUserids = dedupedRows.map((r) => r.userid);
  const regDateMap = {};
  if (allUserids.length > 0) {
    const [regRows] = await pool.query(
      'SELECT userid, reg_date FROM users WHERE userid IN (?)',
      [allUserids],
    );
    for (const r of regRows) regDateMap[r.userid] = r.reg_date;
  }
  const sortedAll = dedupedRows
    .filter((r) => meetsMinWinStreakForRanking(r.longest_win_streak, r.current_win_streak))
    .sort((a, b) => {
      if ((b.longest_win_streak ?? 0) !== (a.longest_win_streak ?? 0)) {
        return (b.longest_win_streak ?? 0) - (a.longest_win_streak ?? 0);
      }
      const ta = a.longest_win_streak_achieved_at ? new Date(a.longest_win_streak_achieved_at).getTime() : Infinity;
      const tb = b.longest_win_streak_achieved_at ? new Date(b.longest_win_streak_achieved_at).getTime() : Infinity;
      if (ta !== tb) return ta - tb;
      const sa = a.longest_win_streak_started_at ? new Date(a.longest_win_streak_started_at).getTime() : Infinity;
      const sb = b.longest_win_streak_started_at ? new Date(b.longest_win_streak_started_at).getTime() : Infinity;
      if (sa !== sb) return sa - sb;
      const ra = regDateMap[a.userid] ? new Date(regDateMap[a.userid]).getTime() : Infinity;
      const rb = regDateMap[b.userid] ? new Date(regDateMap[b.userid]).getTime() : Infinity;
      return ra - rb;
    });
  return sortedAll;
}

export async function getAvailableRankingPeriods() {
  const [rows] = await pool.query(
    'SELECT DISTINCT period_value FROM quiz_user_streaks_monthly ORDER BY period_value DESC',
  );
  const set = new Set(rows.map((r) => r.period_value));
  set.add(getCurrentPeriodValue());
  const period_values = Array.from(set).sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
  return { period_values };
}

export async function getMonthlyRanking(dto) {
  const periodValue = dto.period_value || getCurrentPeriodValue();
  const page = Math.max(1, dto.page ?? 1);
  const limit = Math.min(Math.max(dto.limit ?? 10, 1), 500);
  const offset = (page - 1) * limit;
  const current_userid = dto.current_userid;

  const sortedAll = await buildSortedRows(periodValue);
  const total = sortedAll.length;
  const rawRows = sortedAll.slice(offset, offset + limit);

  const sliceUserids = rawRows.map((r) => r.userid);
  const displaynameMap = {};
  const pictureMap = {};
  const expMap = {};
  if (sliceUserids.length > 0) {
    const [userRows] = await pool.query(
      'SELECT userid, displayname, picture FROM users WHERE userid IN (?)',
      [sliceUserids],
    );
    for (const u of userRows) {
      displaynameMap[u.userid] = u.displayname;
      pictureMap[u.userid] = u.picture;
    }
    const [balanceRows] = await pool.query(
      'SELECT userid, exp FROM user_balance WHERE userid IN (?)',
      [sliceUserids],
    );
    for (const b of balanceRows) expMap[b.userid] = b.exp;
  }

  let my_userName = null;
  let my_picture = null;
  let my_grade = null;
  let my_gradeId = null;
  let my_gradeName = null;
  let my_currentStreak = null;
  let my_longest_win_streak = null;
  let my_rank = null;

  if (current_userid) {
    const [myUserRows] = await pool.query(
      'SELECT displayname, picture FROM users WHERE userid = ?',
      [current_userid],
    );
    my_userName = myUserRows[0]?.displayname ?? null;
    my_picture = myUserRows[0]?.picture ?? null;

    const myIdx = sortedAll.findIndex((r) => r.userid === current_userid);
    if (myIdx !== -1) {
      const myRow = sortedAll[myIdx];
      const rank = myIdx + 1;
      const longest = myRow.longest_win_streak ?? 0;
      const current = myRow.current_win_streak ?? 0;
      const poolSize = Math.max(total - 5, 1);
      const percentile = rank <= 5 ? 0 : (rank - 5) / poolSize;
      const [myBalanceRows] = await pool.query(
        'SELECT exp FROM user_balance WHERE userid = ?',
        [current_userid],
      );
      const myExp = myBalanceRows[0]?.exp ?? 0;
      my_rank = rank;
      my_grade = getRankingGrade(rank, longest, percentile);
      my_gradeId = getGradeByExp(myExp);
      my_gradeName = getGradeNameByExp(myExp);
      my_currentStreak = `W${current}`;
      my_longest_win_streak = `W${longest}`;
    }
  }

  const rankings = rawRows.map((r, i) => {
    const rank = offset + i + 1;
    const longest = r.longest_win_streak ?? 0;
    const currentStreak = r.current_win_streak ?? 0;
    const poolSize = Math.max(total - 5, 1);
    const currentRankPercentile = rank <= 5 ? 0 : (rank - 5) / poolSize;
    const grade = getRankingGrade(rank, longest, currentRankPercentile);
    const expected_reward = calculateRankingReward(rank, longest, total, currentRankPercentile);
    const exp = expMap[r.userid] ?? 0;
    return {
      rank,
      userid: r.userid,
      userName: displaynameMap[r.userid] ?? null,
      picture: pictureMap[r.userid] ?? null,
      grade,
      gradeId: getGradeByExp(exp),
      gradeName: getGradeNameByExp(exp),
      expected_reward,
      currentStreak: `W${currentStreak}`,
      longest_win_streak: `W${longest}`,
      isMe: r.userid === current_userid,
    };
  });

  const total_pages = Math.ceil(total / limit) || 1;

  return {
    period_value: periodValue,
    my_userName,
    my_picture,
    my_grade,
    my_gradeId,
    my_gradeName,
    my_currentStreak,
    my_longest_win_streak,
    my_rank,
    rankings,
    total,
    page,
    limit,
    total_pages,
  };
}

export async function getMonthlyRankingUserDetail(userid, period_value) {
  const periodValue = period_value || getCurrentPeriodValue();
  const sortedAll = await buildSortedRows(periodValue);
  const idx = sortedAll.findIndex((r) => r.userid === userid);
  if (idx === -1) throw new Error('해당 월 랭킹에 해당 유저가 없습니다.');
  const rank = idx + 1;
  const totalParticipants = sortedAll.length;
  const row = sortedAll[idx];
  const longest = row.longest_win_streak ?? 0;
  const current = row.current_win_streak ?? 0;
  const poolSize = Math.max(totalParticipants - 5, 1);
  const percentile = rank <= 5 ? 0 : (rank - 5) / poolSize;
  const grade = getRankingGrade(rank, longest, percentile);
  const expected_reward = calculateRankingReward(rank, longest, totalParticipants, percentile);
  const [userRows] = await pool.query(
    'SELECT displayname, picture FROM users WHERE userid = ?',
    [userid],
  );
  return {
    period_value: periodValue,
    userid,
    userName: userRows[0]?.displayname ?? null,
    picture: userRows[0]?.picture ?? null,
    rank,
    grade,
    currentStreak: `W${current}`,
    longest_win_streak: `W${longest}`,
    expected_reward,
    total_participants: totalParticipants,
  };
}
