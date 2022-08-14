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

  async createPlayer(playerData: CreatePlayerDto): Promise<IPlayer> {
    try {
      const playerToCreate = new this.playerModel(playerData);
      return await playerToCreate.save();
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Email or phoneNumber already exists!');
    }
  }

  async updatePlayer(
    _id: string,
    playerData: CreatePlayerDto,
  ): Promise<IPlayer> {
    await this.playerExist(_id);

    try {
      return await this.playerModel
        .findOneAndUpdate({ _id }, { $set: playerData }, { new: true })
        .exec();
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Email or phone number already exists!');
    }
  }

  async deletePlayer(_id: string): Promise<void> {
    await this.playerExist(_id);
    await this.playerModel.deleteOne({ _id }).exec();
  }

  async getPlayer(_id: string): Promise<IPlayer> {
    const foundPlayer = await this.playerModel.findOne({ _id }).exec();
    if (!foundPlayer)
      throw new NotFoundException(`Player with id: ${_id} not found!`);
    return foundPlayer;
  }

  async listPlayers(): Promise<IPlayer[]> {
    return await this.playerModel.find().exec();
  }

  private async playerExist(_id: string) {
    const result = await this.playerModel.count({ _id }).exec();
    if (!result)
      throw new NotFoundException(`Player with id: ${_id} not found!`);
  }
}
