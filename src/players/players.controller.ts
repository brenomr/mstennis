import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePlayerDto, UpdatePlayerDto } from './dtos/player.dto';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  async createPlayer(@Body() playerData: CreatePlayerDto) {
    return this.playerService.createPlayer(playerData);
  }

  @Put('/:_id')
  async updatePlayer(
    @Param('_id') _id: string,
    @Body() playerData: UpdatePlayerDto,
  ) {
    return this.playerService.updatePlayer(_id, playerData);
  }

  @Get('/:_id')
  async getPlayer(@Param('_id') _id: string) {
    return await this.playerService.getPlayer(_id);
  }

  @Get()
  async listPlayers() {
    return await this.playerService.listPlayers();
  }

  @Delete('/:_id')
  async deletePlayer(@Param('_id') _id: string) {
    return await this.playerService.deletePlayer(_id);
  }
}
