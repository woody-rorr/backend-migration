import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetDailyActivityDto {
  @ApiPropertyOptional({ description: '기간 값' })
  @IsOptional()
  @IsString()
  period_value?: string;
}
