import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetQuizCalendarDto {
  @ApiProperty({ description: '연도' })
  @Type(() => Number)
  @IsInt({ message: 'year는 정수여야 합니다' })
  year!: number;

  @ApiProperty({ description: '월' })
  @Type(() => Number)
  @IsInt({ message: 'month는 정수여야 합니다' })
  month!: number;

  @ApiPropertyOptional({ description: '오늘 날짜 (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  today?: string;
}
