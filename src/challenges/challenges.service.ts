import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { IPlayer } from 'src/players/interfaces/players.interface';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDto, UpdateChallengeDto } from './dtos/challenges.dto';
import { MatchResultDto } from './dtos/match.dto';
import {
  ChallengeStatus,
  IChallenge,
  IMatch,
} from './interfaces/challenges.interface';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge')
    private readonly challengeModel: Model<IChallenge>,
    @InjectModel('Match')
    private readonly matchModel: Model<IMatch>,
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

  async getChallengesByPlayerId(playerId: string): Promise<IChallenge[]> {
    await this.playerService.playerExist(playerId);
    return await this.challengeModel
      .find()
      .where('players')
      .in([playerId])
      .populate('challenger')
      .populate('players')
      .populate('match')
      .exec();
  }

  async listChallenges(): Promise<IChallenge[]> {
    return await this.challengeModel
      .find()
      .populate('challenger')
      .populate('players')
      .populate('match')
      .exec();
  }

  async updateChallenge(
    _id: string,
    challengeData: UpdateChallengeDto,
  ): Promise<void> {
    const challengeFound = await this.getChallenge(_id);

    if (
      challengeData.status &&
      challengeData.status !== challengeFound.status
    ) {
      challengeFound.responseDate = new Date();
      challengeFound.status = challengeData.status;
    }
    if (challengeData.challengeDate)
      challengeFound.challengeDate = challengeData.challengeDate;

    await this.challengeModel
      .findOneAndUpdate({ _id }, { $set: challengeFound })
      .exec();
  }

  async matchResult(_id: string, matchData: MatchResultDto): Promise<void> {
    const challengeFound = await this.getChallenge(_id);

    const playerFound = challengeFound.players.filter((player) => {
      player._id == matchData.def;
    });

    if (playerFound.length == 0)
      throw new BadRequestException(`The winner isn't on the match!`);

    const createdMatch = new this.matchModel(matchData);

    createdMatch.category = challengeFound.category;
    createdMatch.players = challengeFound.players;

    const { _id: matchId } = await createdMatch.save();

    challengeFound.status = ChallengeStatus.DONE;
    challengeFound.match = matchId;

    try {
      await this.challengeModel
        .findOneAndUpdate({ _id }, { $set: challengeFound })
        .exec();
    } catch (error) {
      await this.matchModel.deleteOne({ _id: matchId }).exec();
      throw new InternalServerErrorException(
        `Could not save the match result!`,
      );
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

  private async getChallenge(_id: string): Promise<IChallenge> {
    const challengeFound = await this.challengeModel.findById(_id).exec();
    if (!challengeFound) {
      throw new NotFoundException(`Challenge with id ${_id}, doesn't exist!`);
    }
    return challengeFound;
  }
}
