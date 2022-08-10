import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/player.dto';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  async createAndUpdatePlayer(@Body() playerData: CreatePlayerDto) {
    return this.playerService.createUpdatePlayer(playerData);
  }
}
