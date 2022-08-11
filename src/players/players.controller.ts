import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/player.dto';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  async createUpdatePlayer(@Body() playerData: CreatePlayerDto) {
    return this.playerService.createUpdatePlayer(playerData);
  }

  @Get()
  async getPlayers(@Query('email') email: string) {
    if (email) return await this.playerService.getPlayer(email);
    else return await this.playerService.listPlayers();
  }

  @Delete()
  async deletePlayer(@Query('email') email: string) {
    return await this.playerService.deletePlayer(email);
  }
}
