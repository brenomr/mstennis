import { Document } from 'mongoose';
import { IPlayer } from 'src/players/interfaces/players.interface';

export interface IChallenge extends Document {
  challengeDate: Date;
  status: ChallengeStatus;
  requestDate: Date;
  responseDate: Date;
  challenger: IPlayer;
  category: string;
  players: Array<IPlayer>;
  match: string;
}

export enum ChallengeStatus {
  DONE = 'DONE',
  PENDING = 'PENDING',
  ACCEPT = 'ACCEPT',
  NEGATED = 'NEGATED',
  CANCELED = 'CANCELED',
}
