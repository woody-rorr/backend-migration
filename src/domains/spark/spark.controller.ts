import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CurrentUser, AuthUser } from '../../auth/current-user.decorator';
import { SparkService } from './spark.service';
import { GetTransactionsQueryDto } from './dto/get-transactions-query.dto';
import { RewardQuizParticipationDto } from './dto/reward-quiz-participation.dto';
import { ProcessMonthlyRankingRewardDto } from './dto/process-monthly-ranking-reward.dto';

@ApiTags('spark')
@Controller('spark')
export class SparkController {
  constructor(private readonly sparkService: SparkService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '내 Spark 프로필 조회' })
  @ApiResponse({ status: 200, description: 'OK' })
  async getProfile(@CurrentUser() user: AuthUser) {
    return this.sparkService.getProfile(user.id, (user as any).picture ?? null);
  }

  @Get('transactions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Spark 거래 내역 조회' })
  @ApiResponse({ status: 200, description: 'OK' })
  async getTransactions(
    @CurrentUser() user: AuthUser,
    @Query() q: GetTransactionsQueryDto,
  ) {
    return this.sparkService.getTransactions(
      user.id,
      q.source_type,
      q.start_date,
      q.end_date,
      q.limit,
      q.offset,
    );
  }

  @Get('summary')
  @ApiOperation({ summary: 'Spark 요약 (미구현)' })
  @ApiResponse({ status: 200, description: 'OK' })
  async getSummary() {
    return this.sparkService.getSummary();
  }

  @Post('rewards/quiz-participation')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '퀴즈 참여 Spark 지급' })
  @ApiResponse({ status: 200, description: 'OK' })
  async rewardQuizParticipation(
    @CurrentUser() user: AuthUser,
    @Body() body: RewardQuizParticipationDto,
  ) {
    return this.sparkService.rewardQuizParticipation(user.id, body);
  }

  @Post('rewards/ranking/process-monthly')
  @ApiOperation({ summary: '월간 랭킹 보상 처리' })
  @ApiResponse({ status: 200, description: 'OK' })
  async processMonthlyRankingReward(
    @Body() body: ProcessMonthlyRankingRewardDto,
  ) {
    return this.sparkService.processMonthlyRankingReward(body.period_value);
  }
}
