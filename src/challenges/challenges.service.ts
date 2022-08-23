import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { IPlayer } from 'src/players/interfaces/players.interface';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDto } from './dtos/challenges.dto';
import { ChallengeStatus, IChallenge } from './interfaces/challenges.interface';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge')
    private readonly challengeModel: Model<IChallenge>,
    private readonly playerService: PlayersService,
    private readonly categoryService: CategoriesService,
  ) {}

  async createChallenge(
    challengeData: CreateChallengeDto,
  ): Promise<IChallenge> {
    try {
      await this.playersExist(challengeData.players);
      this.isChallengerOnMatch(challengeData);
      const playerCategory = await this.categoryService.getCategoryByPlayerId(
        challengeData.challenger,
      );

      const createdChallenge = new this.challengeModel(challengeData);

      createdChallenge.category = playerCategory.category;
      createdChallenge.requestDate = new Date();
      createdChallenge.status = ChallengeStatus.PENDING;
      return await createdChallenge.save();
    } catch (error) {
      console.log(error);
    }
  }

  private async playersExist(players: IPlayer[]): Promise<void> {
    await Promise.all(
      players.map(async (player) => {
        await this.playerService.playerExist(player._id);
      }),
    );
  }

  private isChallengerOnMatch(challengeData: CreateChallengeDto): void {
    const challengerIsOnMatch = challengeData.players.some(
      (player) => player._id == challengeData.challenger,
    );

    if (!challengerIsOnMatch)
      throw new BadRequestException(
        `The challenger need to be one player of the match!`,
      );
  }
}
