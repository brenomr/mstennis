import { Document } from 'mongoose';
import { IPlayer } from 'src/players/interfaces/players.interface';

export interface IChallenge extends Document {
  readonly challengeDate: Date;
  challenger: string;
  players: Array<IPlayer>;
}
