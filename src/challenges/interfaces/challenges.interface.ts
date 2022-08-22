import { Document } from 'mongoose';
import { IPlayer } from 'src/players/interfaces/players.interface';

export interface IChallenge extends Document {
  readonly challengeDate: Date;
  status: string;
  requestDate: Date;
  responseDate: Date;
  challenger: string;
  category: string;
  players: Array<IPlayer>;
  match: string;
}
