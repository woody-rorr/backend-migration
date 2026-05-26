import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PutQuizAnswerDto {
  @ApiPropertyOptional({ description: '매치 ID' })
  @IsOptional()
  @IsString()
  match_id?: string;

  @ApiPropertyOptional({ description: '문제 ID (match_id 대체 가능)' })
  @IsOptional()
  @IsString()
  problem_id?: string;

  @ApiPropertyOptional({ description: '게임 ID' })
  @IsOptional()
  @IsString()
  game_id?: string;

  @ApiPropertyOptional({ description: '선택한 팀 ID' })
  @IsOptional()
  selected_team_id?: string | number | null;

  @ApiPropertyOptional({ description: 'submit | cancel', example: 'submit' })
  @IsOptional()
  @IsString()
  action?: string;
}
