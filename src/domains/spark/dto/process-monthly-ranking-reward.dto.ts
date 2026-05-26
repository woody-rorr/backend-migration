import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProcessMonthlyRankingRewardDto {
  @ApiProperty({ description: '대상 월 (예: "2026-02")', example: '2026-02' })
  @Transform(({ obj, value }) => value ?? obj.periodValue ?? '')
  @IsString()
  period_value!: string;

  @ApiPropertyOptional({ description: '대상 월 (camelCase 별칭)' })
  @IsOptional()
  @IsString()
  periodValue?: string;
}
