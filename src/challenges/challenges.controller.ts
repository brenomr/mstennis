import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto, UpdateChallengeDto } from './dtos/challenges.dto';
import { MatchResultDto } from './dtos/match.dto';
import { ValidateChallengeStatusPipe } from './pipes/validate-challenge-status.pipe';

@Controller('api/v1/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  async createChallenge(@Body() challengeData: CreateChallengeDto) {
    return await this.challengesService.createChallenge(challengeData);
  }

  @Post('/:challengeId/match/')
  async matchResult(
    @Param('challengeId') _id: string,
    @Body() matchData: MatchResultDto,
  ) {
    return await this.challengesService.matchResult(_id, matchData);
  }

  @Get()
  async getChallenges(@Query('playerId') playerId: string) {
    return playerId
      ? await this.challengesService.getChallengesByPlayerId(playerId)
      : await this.challengesService.listChallenges();
  }

  @Put('/:challengeId')
  async updateChallenge(
    @Param('challengeId') _id: string,
    @Body(ValidateChallengeStatusPipe) challengeData: UpdateChallengeDto,
  ) {
    return await this.challengesService.updateChallenge(_id, challengeData);
  }

  @Delete('/:id')
  async deleteChallenge(@Param('id') _id: string) {
    return await this.challengesService.deleteChallenge(_id);
  }
}
