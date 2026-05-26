import { BadRequestException, Injectable } from '@nestjs/common';
import { BusinessException } from '../../common/exceptions/business.exception';
import { resultCode } from '../../common/result-code';
import { getDataSource } from '../../database/data-source';
import { SparkDBService } from './spark-db.service';
import { SparkServices } from './spark-business.service';
import { RewardQuizParticipationDto } from './dto/reward-quiz-participation.dto';

function normalizeQuizParticipationBody(raw: any): { userid: string; match_id: string; game_id?: string | null } {
  const body = typeof raw === 'string' ? (raw ? JSON.parse(raw) : {}) : raw ?? {};
  const userid = body.userid ?? body.userId ?? '';
  const match_id = body.match_id ?? body.matchId ?? body.problem_id ?? body.problemId ?? '';
  const game_id = body.game_id ?? body.gameId ?? undefined;
  const gid = game_id != null && String(game_id).trim() !== '' ? String(game_id).trim() : null;
  return { userid, match_id, game_id: gid };
}

@Injectable()
export class SparkService {
  async getProfile(userid: string, pictureFromToken?: string | null) {
    if (!userid) {
      throw new BadRequestException('userid is required');
    }
    try {
      const ds = await getDataSource();
      const db = new SparkDBService(ds);
      const service = new SparkServices(db);
      const data = await service.getProfile(userid, pictureFromToken);
      return { resultCode: resultCode.Success, resultMsg: 'Success', data };
    } catch (error: any) {
      throw new BusinessException(resultCode.error, error?.message ?? String(error));
    }
  }

  async getTransactions(
    userid: string,
    source_type?: string,
    start_date?: string,
    end_date?: string,
    limit?: number,
    offset?: number,
  ) {
    if (!userid) {
      throw new BadRequestException('userid is required');
    }
    try {
      const ds = await getDataSource();
      const db = new SparkDBService(ds);
      const service = new SparkServices(db);
      const data = await service.getTransactions(
        userid,
        source_type,
        start_date,
        end_date,
        limit ?? 20,
        offset ?? 0,
      );
      return { resultCode: resultCode.Success, resultMsg: 'Success', data };
    } catch (error: any) {
      throw new BusinessException(resultCode.error, error?.message ?? String(error));
    }
  }

  async getSummary() {
    return {
      resultCode: resultCode.error,
      resultMsg: 'getSummary is not implemented',
      data: null,
    };
  }

  async rewardQuizParticipation(userid: string, rawBody: RewardQuizParticipationDto | any) {
    const body = normalizeQuizParticipationBody(rawBody);
    const match_id = body.match_id;
    if (!userid) {
      throw new BadRequestException('userid is required');
    }
    if (!match_id) {
      throw new BadRequestException('match_id is required');
    }
    try {
      const ds = await getDataSource();
      const db = new SparkDBService(ds);
      const service = new SparkServices(db);
      const data = await service.rewardQuizParticipation(userid, match_id, body.game_id);
      return { resultCode: resultCode.Success, resultMsg: 'Success', data };
    } catch (error: any) {
      throw new BusinessException(resultCode.error, error?.message ?? String(error));
    }
  }

  async processMonthlyRankingReward(period_value: string) {
    if (!period_value) {
      throw new BadRequestException('period_value is required (e.g. "2026-02")');
    }
    try {
      const ds = await getDataSource();
      const db = new SparkDBService(ds);
      const service = new SparkServices(db);
      const data = await service.processMonthlyRankingReward(period_value);
      return { resultCode: resultCode.Success, resultMsg: 'Success', data };
    } catch (error: any) {
      throw new BusinessException(resultCode.error, error?.message ?? String(error));
    }
  }
}
