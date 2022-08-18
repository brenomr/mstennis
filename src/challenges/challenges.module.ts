import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { ChallengesSchema } from './schema/challenges.schema';
import { MatchesSchema } from './schema/matches.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Match', schema: MatchesSchema },
      { name: 'Challenge', schema: ChallengesSchema },
    ]),
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}
