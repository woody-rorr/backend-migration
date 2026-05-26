import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { getDataSource } from '../../database/data-source';
import { resultCode } from '../../common/result-code';
import { FollowDBService } from './follow.db.service';
import { FollowServices as FollowBizService } from './follow.biz.service';
import {
  DeleteFollowDto,
  PutFollowDto,
  PutFollowResponseDto,
  DeleteFollowResponseDto,
} from './dto';
import type {
  PutFollowBatchRequestDto,
  PutFollowBatchResponseDto,
} from './dto/put-follow-batch.dto';
import { GetMyFollowResponseDto } from './dto/get-my-follow.dto';
import { GetListWithFollowResponseDto } from './dto/get-list-with-follow.dto';

export type FollowType = 'league' | 'team' | 'player';

@Injectable()
export class FollowService {
  async getMyFollows(userid: string, followType?: FollowType): Promise<GetMyFollowResponseDto> {
    try {
      const ds = await getDataSource();
      const db = new FollowDBService(ds);
      const service = new FollowBizService(db);
      return await service.getMyFollows(userid, followType);
    } catch (error: any) {
      throw new HttpException(
        { resultCode: resultCode.error, resultMsg: error?.message ?? String(error) },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async putFollows(
    userid: string,
    followType: FollowType,
    body: PutFollowDto,
  ): Promise<PutFollowResponseDto> {
    try {
      const ds = await getDataSource();
      const db = new FollowDBService(ds);
      const service = new FollowBizService(db);
      return await service.putFollows(userid, followType, body);
    } catch (error: any) {
      throw new HttpException(
        { resultCode: resultCode.error, resultMsg: error?.message ?? String(error) },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getListWithFollow(
    userid: string,
    followType: FollowType,
    limit?: number,
    offset?: number,
  ): Promise<GetListWithFollowResponseDto> {
    try {
      const ds = await getDataSource();
      const db = new FollowDBService(ds);
      const service = new FollowBizService(db);
      return await service.getListWithFollow(userid, followType, limit, offset);
    } catch (error: any) {
      throw new HttpException(
        { resultCode: resultCode.error, resultMsg: error?.message ?? String(error) },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTeamsWithFollow(
    userid: string,
    limit?: number,
    offset?: number,
  ): Promise<GetListWithFollowResponseDto> {
    try {
      const ds = await getDataSource();
      const db = new FollowDBService(ds);
      const service = new FollowBizService(db);
      return await service.getListWithFollow(userid, 'team', limit, offset);
    } catch (error: any) {
      throw new HttpException(
        { resultCode: resultCode.error, resultMsg: error?.message ?? String(error) },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async putFollowsBatch(
    userid: string,
    body: PutFollowBatchRequestDto,
  ): Promise<PutFollowBatchResponseDto> {
    try {
      const ds = await getDataSource();
      const db = new FollowDBService(ds);
      const service = new FollowBizService(db);
      return await service.putFollowsBatch(userid, body);
    } catch (error: any) {
      throw new HttpException(
        { resultCode: resultCode.error, resultMsg: error?.message ?? String(error) },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFollow(
    userid: string,
    deleteFollowDto: DeleteFollowDto,
  ): Promise<DeleteFollowResponseDto> {
    try {
      const ds = await getDataSource();
      const db = new FollowDBService(ds);
      const service = new FollowBizService(db);
      return await service.deleteFollow(userid, deleteFollowDto);
    } catch (error: any) {
      const msg = error?.message ?? String(error);
      const code = msg.includes('찾을 수 없습니다') ? resultCode.FollowNotExists : resultCode.error;
      throw new HttpException(
        { resultCode: code, resultMsg: msg },
        msg.includes('찾을 수 없습니다') ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
