import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto, UpdateChallengeDto } from './dtos/challenges.dto';
import { ValidateChallengeStatusPipe } from './pipes/validate-challenge-status.pipe';

@Controller('api/v1/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  async createChallenge(@Body() challengeData: CreateChallengeDto) {
    return await this.challengesService.createChallenge(challengeData);
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
}
