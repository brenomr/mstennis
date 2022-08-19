import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDto } from './dtos/challenges.dto';
import { IChallenge } from './interfaces/challenges.interface';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge')
    private readonly challengeModel: IChallenge,
    private readonly playerService: PlayersService,
  ) {}

  async createChallenge(challengeData: CreateChallengeDto): Promise<void> {
    // const allPlayers = await this.playerService.listPlayers();

    // challengeData.players.map((player) => {
    //   const foundPlayer = allPlayers.filter((p) => p._id == player._id);

    //   if (foundPlayer.length == 0)
    //     throw new BadRequestException(`The id ${player._id} isn't a player!`);
    // });

    // this.challengerIsOnMatch(challengeData);

    Promise.all(
      challengeData.players.map(async (player) => {
        console.log(`PASSOU: ${player._id}`);
        await this.playerService
          .playerExist(player._id)
          .catch((error) => console.log(error));
      }),
    );

    // challengeData.players.map(async (player) => {
    //   await this.playerService
    //     .playerExist(player._id)
    //     .catch((error) => console.log(error));
    // });
  }

  challengerIsOnMatch(challengeData: CreateChallengeDto): void {
    const challengerIsOnMatch = challengeData.players.some(
      (player) => player._id == challengeData.challenger,
    );

    if (!challengerIsOnMatch)
      throw new BadRequestException(
        `The challenger need to be one player of the match!`,
      );
  }
}
