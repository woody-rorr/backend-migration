import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CurrentUser } from '../../auth/current-user.decorator';
import type { AuthUser } from '../../auth/current-user.decorator';
import { FollowService, FollowType } from './follow.service';
import { PutFollowRequestDto } from './dto/put-follow.dto';
import { PutFollowBatchRequestDto } from './dto/put-follow-batch.dto';

const VALID_FOLLOW_TYPES: FollowType[] = ['league', 'team', 'player'];

function parseLimitOffset(q: Record<string, string | undefined>): {
  limit: number | undefined;
  offset: number;
} {
  const hasLimit = q.limit != null && q.limit !== '';
  const limit = hasLimit ? parseInt(q.limit!, 10) : undefined;
  const offset = q.offset != null && q.offset !== '' ? parseInt(q.offset, 10) : 0;
  return {
    limit: hasLimit && !Number.isNaN(limit!) && limit! > 0 ? Math.min(limit!, 200) : undefined,
    offset: Number.isNaN(offset) ? 0 : Math.max(offset, 0),
  };
}

@ApiTags('follow')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get('my')
  @ApiOperation({ summary: '내 팔로우 목록 조회' })
  @ApiResponse({ status: 200, description: 'OK' })
  async getMyFollows(
    @CurrentUser() user: AuthUser,
    @Query('follow_type') followType?: string,
  ) {
    const userid = user?.id;
    if (!userid) {
      throw new BadRequestException('userid is required');
    }
    return this.followService.getMyFollows(userid, followType as FollowType | undefined);
  }

  @Get('list')
  @ApiOperation({ summary: '팔로우 여부 포함 목록 조회' })
  @ApiResponse({ status: 200, description: 'OK' })
  async getListWithFollow(
    @CurrentUser() user: AuthUser,
    @Query() query: Record<string, string | undefined>,
  ) {
    const userid = user?.id;
    if (!userid) {
      throw new BadRequestException('userid is required');
    }
    const rawType = (query.follow_type ?? 'team').toLowerCase().trim();
    const followType: FollowType = VALID_FOLLOW_TYPES.includes(rawType as FollowType)
      ? (rawType as FollowType)
      : 'team';
    const { limit, offset } = parseLimitOffset(query);
    return this.followService.getListWithFollow(userid, followType, limit, offset);
  }

  @Get('list/teams')
  @ApiOperation({ summary: '팀 목록 + 팔로우 여부' })
  @ApiResponse({ status: 200, description: 'OK' })
  async getTeamsWithFollow(
    @CurrentUser() user: AuthUser,
    @Query() query: Record<string, string | undefined>,
  ) {
    const userid = user?.id;
    if (!userid) {
      throw new BadRequestException('userid is required');
    }
    const { limit, offset } = parseLimitOffset(query);
    return this.followService.getTeamsWithFollow(userid, limit, offset);
  }

  @Put()
  @ApiOperation({ summary: '팔로우 일괄 등록 (단일 follow_type)' })
  @ApiResponse({ status: 200, description: 'OK' })
  async putFollows(
    @CurrentUser() user: AuthUser,
    @Query() query: Record<string, string | undefined>,
    @Body() body: PutFollowBatchRequestDto & PutFollowRequestDto & Record<string, unknown>,
  ) {
    const userid = user?.id;
    if (!userid) {
      throw new BadRequestException('userid is required');
    }

    const hasBatchShape =
      body && typeof body === 'object' && (
        Array.isArray((body as any).league) ||
        Array.isArray((body as any).team) ||
        Array.isArray((body as any).player)
      );

    if (hasBatchShape) {
      const validated = this.validatePutFollowBatchBody(body);
      if (!validated.ok) {
        throw new BadRequestException(validated.msg);
      }
      const data = validated.data;
      const FOLLOW_LIMIT = { league: 3, team: 6, player: 12 } as const;
      if (data.league !== undefined && data.league.length > FOLLOW_LIMIT.league) {
        throw new BadRequestException(`리그는 최대 ${FOLLOW_LIMIT.league}개까지 선택 가능합니다.`);
      }
      if (data.team !== undefined && data.team.length > FOLLOW_LIMIT.team) {
        throw new BadRequestException(`팀은 최대 ${FOLLOW_LIMIT.team}개까지 선택 가능합니다.`);
      }
      if (data.player !== undefined && data.player.length > FOLLOW_LIMIT.player) {
        throw new BadRequestException(`선수는 최대 ${FOLLOW_LIMIT.player}개까지 선택 가능합니다.`);
      }
      const payload: PutFollowBatchRequestDto = {};
      if (data.league !== undefined) payload.league = data.league;
      if (data.team !== undefined) payload.team = data.team;
      if (data.player !== undefined) payload.player = data.player;
      return this.followService.putFollowsBatch(userid, payload);
    }

    const rawFollowType =
      query.follow_type ?? (query as any).followType ?? (body as any)?.follow_type ?? (body as any)?.followType;
    const followTypeFromQuery = Array.isArray(rawFollowType) ? rawFollowType[0] : rawFollowType;

    const validated = this.validatePutFollowBody(body);
    if (!validated.ok) {
      throw new BadRequestException(validated.msg);
    }
    const { data } = validated;
    const followType = data.follow_type ?? followTypeFromQuery;
    if (!followType) {
      throw new BadRequestException('follow_type is required (query or body)');
    }
    const followTypeNormalized = String(followType).trim().toLowerCase() as FollowType;
    if (!VALID_FOLLOW_TYPES.includes(followTypeNormalized)) {
      throw new BadRequestException(
        `follow_type must be league, team, or player (received: ${JSON.stringify(followType)})`,
      );
    }
    return this.followService.putFollows(userid, followTypeNormalized, { follow: data.follow });
  }

  @Delete(':followType/:targetId')
  @ApiOperation({ summary: '팔로우 단건 삭제' })
  @ApiResponse({ status: 200, description: 'OK' })
  async deleteFollow(
    @CurrentUser() user: AuthUser,
    @Param('followType') followType: string,
    @Param('targetId') targetId: string,
  ) {
    const userid = user?.id;
    if (!userid) {
      throw new BadRequestException('userid is required');
    }
    if (!followType || !targetId) {
      throw new BadRequestException('followType, targetId are required');
    }
    return this.followService.deleteFollow(userid, {
      follow_type: followType as FollowType,
      target_id: targetId,
    });
  }

  private validatePutFollowBody(
    body: unknown,
  ): { ok: true; data: PutFollowRequestDto } | { ok: false; msg: string } {
    if (!body || typeof body !== 'object') {
      return { ok: false, msg: 'Request body is required' };
    }
    const b = body as Record<string, unknown>;
    if (!Array.isArray(b.follow)) {
      return { ok: false, msg: 'follow array is required' };
    }
    const follow = b.follow as PutFollowRequestDto['follow'];
    for (let i = 0; i < follow.length; i++) {
      const item = follow[i];
      if (!item || typeof item !== 'object' || typeof (item as any).target_id !== 'string') {
        return { ok: false, msg: `follow[${i}].target_id is required (string)` };
      }
    }
    const follow_type = b.follow_type;
    if (
      follow_type != null &&
      (typeof follow_type !== 'string' ||
        !VALID_FOLLOW_TYPES.includes(follow_type.trim().toLowerCase() as FollowType))
    ) {
      return { ok: false, msg: 'follow_type must be league, team, or player' };
    }
    return {
      ok: true,
      data: {
        follow_type:
          follow_type != null ? (String(follow_type).trim().toLowerCase() as FollowType) : undefined,
        follow: follow.map((item) => ({ target_id: (item as any).target_id })),
      },
    };
  }

  private validatePutFollowBatchBody(
    body: unknown,
  ): { ok: true; data: PutFollowBatchRequestDto } | { ok: false; msg: string } {
    if (!body || typeof body !== 'object') {
      return { ok: false, msg: 'Request body is required' };
    }
    const b = body as Record<string, unknown>;
    const toItems = (arr: unknown): PutFollowBatchRequestDto['league'] => {
      if (!Array.isArray(arr)) return undefined;
      return arr
        .map((item) => {
          const o = item as Record<string, unknown>;
          return { target_id: String(o?.target_id ?? '') };
        })
        .filter((x) => x.target_id);
    };
    return {
      ok: true,
      data: {
        league: b.league !== undefined ? toItems(b.league) ?? [] : undefined,
        team: b.team !== undefined ? toItems(b.team) ?? [] : undefined,
        player: b.player !== undefined ? toItems(b.player) ?? [] : undefined,
      },
    };
  }
}
