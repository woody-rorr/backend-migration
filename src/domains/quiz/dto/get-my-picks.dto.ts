import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetMyPicksDto {
  @ApiPropertyOptional({ description: '기간 값' })
  @IsOptional()
  @IsString()
  period_value?: string;

  @ApiPropertyOptional({ description: '기간 월' })
  @IsOptional()
  @IsString()
  period_month?: string;

  @ApiPropertyOptional({ description: '조회 개수' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'limit은 정수여야 합니다' })
  limit?: number;

  @ApiPropertyOptional({ description: '오프셋' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'offset은 정수여야 합니다' })
  offset?: number;
}
