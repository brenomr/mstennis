import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { IPlayer } from 'src/players/interfaces/players.interface';
import { ChallengeStatus } from '../interfaces/challenges.interface';

export class CreateChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  challengeDate: Date;

  @IsNotEmpty()
  challenger: IPlayer;

  @IsArray()
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  players: Array<IPlayer>;
}

export class UpdateChallengeDto {
  @IsOptional()
  @IsDateString()
  challengeDate: Date;

  @IsOptional()
  status: ChallengeStatus;
}
