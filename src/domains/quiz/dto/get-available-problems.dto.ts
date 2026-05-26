import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetAvailableProblemsDto {
  @ApiPropertyOptional({ description: '매치 ID' })
  @IsOptional()
  @IsString()
  match_id?: string;

  @ApiPropertyOptional({ description: '게임 ID' })
  @IsOptional()
  @IsString()
  game_id?: string;
}
