import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/player.dto';
import { IPlayer } from './interfaces/players.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);
  private players: IPlayer[] = [];

  async createUpdatePlayer(playerData: CreatePlayerDto): Promise<IPlayer[]> {
    this.logger.log(`playerData: ${playerData}`);

    this.create(playerData);

    return this.players;
  }

  private create(playerData: CreatePlayerDto): void {
    const { name, phoneNumber, email } = playerData;

    const newPlayer: IPlayer = {
      _id: uuid(),
      name,
      phoneNumber,
      email,
      ranking: 'A',
      positionRanking: 2,
      urlPhotoPlayer: 'https://www.google.com',
    };

    this.players.push(newPlayer);
  }
}
