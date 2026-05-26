import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ManualQuizGameEndDto {
  @ApiPropertyOptional({ description: '매치 ID' })
  @IsOptional()
  @IsString()
  match_id?: string;

  @ApiPropertyOptional({ description: '매치 ID (camelCase)' })
  @IsOptional()
  @IsString()
  matchId?: string;

  @ApiPropertyOptional({ description: '게임 ID' })
  @IsOptional()
  game_id?: string | number;

  @ApiPropertyOptional({ description: '게임 ID (camelCase)' })
  @IsOptional()
  gameId?: string | number;

  @ApiPropertyOptional({ description: '게임 번호' })
  @IsOptional()
  game_number?: string | number;

  @ApiPropertyOptional({ description: '게임 번호 (camelCase)' })
  @IsOptional()
  gameNumber?: string | number;

  @ApiPropertyOptional({ description: '승자 ID' })
  @IsOptional()
  winner_id?: string | number;

  @ApiPropertyOptional({ description: '승자 ID (camelCase)' })
  @IsOptional()
  winnerId?: string | number;
}
