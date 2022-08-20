import { Body, Controller, Post } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dtos/challenges.dto';

@Controller('api/v1/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  async createChallenge(@Body() challengeData: CreateChallengeDto) {
    return await this.challengesService.createChallenge(challengeData);
  }
}
