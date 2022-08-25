import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dtos/challenges.dto';

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
}
