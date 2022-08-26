import { IsNotEmpty } from 'class-validator';
import { IPlayer } from 'src/players/interfaces/players.interface';
import { IResult } from '../interfaces/challenges.interface';

export class MatchResultDto {
  @IsNotEmpty()
  def: IPlayer;

  @IsNotEmpty()
  result: IResult[];
}
