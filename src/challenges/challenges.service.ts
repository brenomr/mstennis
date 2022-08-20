import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { ICategory } from 'src/categories/interfaces/categories.interface';
import { IPlayer } from 'src/players/interfaces/players.interface';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDto } from './dtos/challenges.dto';
import { IChallenge } from './interfaces/challenges.interface';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge')
    private readonly challengeModel: IChallenge,
    private readonly playerService: PlayersService,
    private readonly categoryService: CategoriesService,
  ) {}

  async createChallenge(challengeData: CreateChallengeDto): Promise<void> {
    await this.playersExist(challengeData.players);
    this.isChallengerOnMatch(challengeData);
    await this.checkPlayerCategory(challengeData.players);
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

  private async checkPlayerCategory(players: IPlayer[]): Promise<ICategory[]> {
    let categories = [];
    await Promise.all(
      players.map(async (player) => {
        const result = await this.categoryService.getCategoryByPlayerId(
          player._id,
        );
        categories = categories.concat(result);
      }),
    );
    return categories;
  }
}
