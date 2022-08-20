import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { IPlayer } from 'src/players/interfaces/players.interface';

export class CreateChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  readonly challengeDate: Date;

  @IsNotEmpty()
  challenger: IPlayer;

  @IsArray()
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  players: Array<IPlayer>;
}
