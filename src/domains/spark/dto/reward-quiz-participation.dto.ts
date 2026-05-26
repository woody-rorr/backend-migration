import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RewardQuizParticipationDto {
  @ApiPropertyOptional({ description: '사용자 ID (토큰에서 우선)' })
  @IsOptional()
  @IsString()
  userid?: string;

  @ApiPropertyOptional({ description: '사용자 ID (camelCase 별칭)' })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({ description: '매치 ID' })
  @IsOptional()
  @IsString()
  match_id?: string;

  @ApiPropertyOptional({ description: '매치 ID (camelCase 별칭)' })
  @IsOptional()
  @IsString()
  matchId?: string;

  @ApiPropertyOptional({ description: '문제 ID (별칭)' })
  @IsOptional()
  @IsString()
  problem_id?: string;

  @ApiPropertyOptional({ description: '문제 ID (camelCase 별칭)' })
  @IsOptional()
  @IsString()
  problemId?: string;

  @ApiPropertyOptional({ description: '게임 ID' })
  @IsOptional()
  @IsString()
  game_id?: string | null;

  @ApiPropertyOptional({ description: '게임 ID (camelCase 별칭)' })
  @IsOptional()
  @IsString()
  gameId?: string | null;
}
