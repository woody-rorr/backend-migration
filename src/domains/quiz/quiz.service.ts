import { Injectable, BadRequestException } from '@nestjs/common';
import { loadSecretToCache } from '../../../configuration/secretLoader';
import { resultCode } from '../../common/result-code';
import { QuizCtrl } from './Quiz.Controller';
import { AuthUser } from '../../auth/current-user.decorator';
import { GetQuizProblemDto } from './dto/get-quiz-problem.dto';
import { PutQuizAnswerDto } from './dto/put-quiz-answer.dto';
import { GetQuizCalendarDto } from './dto/get-quiz-calendar.dto';
import { GetMyPicksDto } from './dto/get-my-picks.dto';
import { GetDailyActivityDto } from './dto/get-daily-activity.dto';
import { GetAvailableProblemsDto } from './dto/get-available-problems.dto';
import { ManualQuizGameEndDto } from './dto/manual-quiz-game-end.dto';

function normalizeQuizId(v: unknown): string {
  if (v == null) return '';
  return String(v).trim();
}

function optionalQuizGameId(v: unknown): string | undefined {
  if (v == null || v === '') return undefined;
  const s = String(v).trim();
  return s === '' ? undefined : s;
}

@Injectable()
export class QuizService {
  async getProblem(query: GetQuizProblemDto) {
    const match_id = normalizeQuizId(query.match_id);
    const game_id = optionalQuizGameId(query.game_id);
    if (!match_id) {
      throw new BadRequestException({
        resultCode: resultCode.validationError,
        resultMsg: 'match_id is required',
        data: null,
      });
    }
    const ret = await QuizCtrl.getProblem({ match_id, game_id });
    return ret.getResult();
  }

  async putQuizAnswer(user: AuthUser, body: PutQuizAnswerDto) {
    const userid = user?.id != null ? String(user.id).trim() : '';
    if (!userid) {
      throw new BadRequestException({
        resultCode: resultCode.validationError,
        resultMsg: 'userid is required',
        data: null,
      });
    }
    const { match_id, problem_id, game_id, selected_team_id, action } = body;
    const matchId = normalizeQuizId(match_id ?? problem_id);
    if (!matchId) {
      throw new BadRequestException({
        resultCode: resultCode.validationError,
        resultMsg: 'match_id is required',
        data: null,
      });
    }
    const gameIdNorm = optionalQuizGameId(game_id);
    const isCancel = action === 'cancel';
    if (!isCancel && (selected_team_id == null || selected_team_id === '')) {
      throw new BadRequestException({
        resultCode: resultCode.validationError,
        resultMsg: '제출·수정 시 selected_team_id is required',
        data: null,
      });
    }
    const ret = await QuizCtrl.upsertQuizAnswer(
      userid,
      matchId,
      selected_team_id ?? null,
      gameIdNorm,
      isCancel ? 'cancel' : action ?? 'submit',
    );
    return ret.getResult();
  }

  async getCalendar(user: AuthUser, query: GetQuizCalendarDto) {
    const userid = user?.id;
    if (!userid) {
      throw new BadRequestException({
        resultCode: resultCode.validationError,
        resultMsg: 'userid is required',
        data: null,
      });
    }
    const year = query.year != null ? Number(query.year) : undefined;
    const month = query.month != null ? Number(query.month) : undefined;
    if (year == null || month == null || Number.isNaN(year) || Number.isNaN(month)) {
      throw new BadRequestException({
        resultCode: resultCode.validationError,
        resultMsg: 'year, month are required',
        data: null,
      });
    }
    const today = query.today ?? undefined;
    const ret = await QuizCtrl.getCalendar({ userid, year, month, today });
    return ret.getResult();
  }

  async getMyPicks(user: AuthUser, query: GetMyPicksDto) {
    const rawId = user?.id;
    const userid = rawId != null ? String(rawId) : '';
    if (!userid) {
      throw new BadRequestException({
        resultCode: resultCode.validationError,
        resultMsg: 'userid is required',
        data: null,
      });
    }
    const limit = query.limit != null ? Number(query.limit) : undefined;
    const offset = query.offset != null ? Number(query.offset) : undefined;
    const ret = await QuizCtrl.getMyPicks({
      userid,
      period_value: query.period_value,
      period_month: query.period_month,
      limit: Number.isFinite(limit) ? limit : undefined,
      offset: Number.isFinite(offset) ? offset : undefined,
    });
    return ret.getResult();
  }

  async getDailyActivity(user: AuthUser, query: GetDailyActivityDto) {
    const userid = user?.id;
    if (!userid) {
      throw new BadRequestException({
        resultCode: resultCode.validationError,
        resultMsg: 'userid is required',
        data: null,
      });
    }
    const ret = await QuizCtrl.getDailyActivity({
      userid,
      period_value: query.period_value,
    });
    return ret.getResult();
  }

  async getAvailableProblems(user: AuthUser, query: GetAvailableProblemsDto) {
    const userid = user?.id;
    if (!userid) {
      throw new BadRequestException({
        resultCode: resultCode.validationError,
        resultMsg: 'userid is required',
        data: null,
      });
    }
    const matchIdRaw = query.match_id;
    const matchIdForApi =
      matchIdRaw != null && String(matchIdRaw).trim() !== ''
        ? normalizeQuizId(matchIdRaw)
        : undefined;
    const gameIdForApi = optionalQuizGameId(query.game_id);
    const ret = await QuizCtrl.getAvailableProblems(userid, matchIdForApi, gameIdForApi);
    return ret.getResult();
  }

  async manualQuizGameEnd(body: ManualQuizGameEndDto) {
    await loadSecretToCache();
    const match_id = body.match_id ?? body.matchId ?? '';
    const game_id = body.game_id ?? body.gameId;
    const game_number = body.game_number ?? body.gameNumber;
    const winner_id = body.winner_id ?? body.winnerId ?? '';
    console.log('[manualQuizGameEnd] request', {
      match_id,
      game_id: game_id ?? null,
      game_number: game_number ?? null,
      has_winner_id: String(winner_id).trim() !== '',
    });
    const ret = await QuizCtrl.manualQuizGameEnd({
      match_id,
      game_id,
      game_number,
      winner_id,
    });
    return ret.getResult();
  }
}
