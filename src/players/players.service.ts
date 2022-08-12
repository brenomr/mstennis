import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/player.dto';
import { IPlayer } from './interfaces/players.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player')
    private readonly playerModel: Model<IPlayer>,
  ) {}

  async createUpdatePlayer(playerData: CreatePlayerDto): Promise<IPlayer> {
    try {
      const { email } = playerData;

      const foundPlayer = await this.playerModel.findOne({ email }).exec();

      if (!foundPlayer) {
        await this.create(playerData);
      } else {
        return await this.update(playerData);
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Email or phoneNumber already exists!');
    }
  }

  async deletePlayer(email: string): Promise<void> {
    const result = await this.playerModel.count({ email }).exec();
    if (!result)
      throw new NotFoundException(`Player with e-mail: ${email} not found!`);
    await this.playerModel.deleteOne({ email }).exec();
  }

  async getPlayer(email: string): Promise<IPlayer> {
    const foundPlayer = await this.playerModel.findOne({ email }).exec();
    if (!foundPlayer)
      throw new NotFoundException(`Player with e-mail: ${email} not found!`);
    return foundPlayer;
  }

  async listPlayers(): Promise<IPlayer[]> {
    return await this.playerModel.find().exec();
  }

  private async create(playerData: CreatePlayerDto): Promise<IPlayer> {
    const createdPlayer = new this.playerModel(playerData);
    return await createdPlayer.save();
  }

  private async update(playerData: CreatePlayerDto): Promise<IPlayer> {
    const { email } = playerData;
    return await this.playerModel
      .findOneAndUpdate({ email }, { $set: playerData }, { new: true })
      .exec();
  }
}
