import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CurrentUser, AuthUser } from '../../auth/current-user.decorator';
import { QuizService } from './quiz.service';
import { GetQuizProblemDto } from './dto/get-quiz-problem.dto';
import { PutQuizAnswerDto } from './dto/put-quiz-answer.dto';
import { GetQuizCalendarDto } from './dto/get-quiz-calendar.dto';
import { GetMyPicksDto } from './dto/get-my-picks.dto';
import { GetDailyActivityDto } from './dto/get-daily-activity.dto';
import { GetAvailableProblemsDto } from './dto/get-available-problems.dto';
import { ManualQuizGameEndDto } from './dto/manual-quiz-game-end.dto';

@ApiTags('quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('problem')
  @ApiOperation({ summary: '퀴즈 문제 조회' })
  async getProblem(@Query() query: GetQuizProblemDto) {
    return this.quizService.getProblem(query);
  }

  @Put('answer')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '퀴즈 답안 제출/수정/취소' })
  async putQuizAnswer(
    @CurrentUser() user: AuthUser,
    @Body() body: PutQuizAnswerDto,
  ) {
    return this.quizService.putQuizAnswer(user, body);
  }

  @Get('calendar')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '퀴즈 캘린더 조회' })
  async getCalendar(
    @CurrentUser() user: AuthUser,
    @Query() query: GetQuizCalendarDto,
  ) {
    return this.quizService.getCalendar(user, query);
  }

  @Get('my-picks')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '내 픽 목록 조회' })
  async getMyPicks(
    @CurrentUser() user: AuthUser,
    @Query() query: GetMyPicksDto,
  ) {
    return this.quizService.getMyPicks(user, query);
  }

  @Get('activity/daily')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '일별 활동 조회' })
  async getDailyActivity(
    @CurrentUser() user: AuthUser,
    @Query() query: GetDailyActivityDto,
  ) {
    return this.quizService.getDailyActivity(user, query);
  }

  @Get('available-problems')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '응시 가능한 문제 목록' })
  async getAvailableProblems(
    @CurrentUser() user: AuthUser,
    @Query() query: GetAvailableProblemsDto,
  ) {
    return this.quizService.getAvailableProblems(user, query);
  }

  @Post('admin/manual-game-end')
  @ApiOperation({ summary: '관리자 수동 게임 종료' })
  async manualQuizGameEnd(@Body() body: ManualQuizGameEndDto) {
    return this.quizService.manualQuizGameEnd(body);
  }
}
