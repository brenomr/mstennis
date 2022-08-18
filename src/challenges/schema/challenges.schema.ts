import * as mongoose from 'mongoose';

export const ChallengesSchema = new mongoose.Schema(
  {
    challengeDate: { type: Date },
    status: { type: String },
    requestDate: { type: Date },
    responseDate: { type: Date },
    challenger: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category ' },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
    match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
  },
  { timestamps: true, collection: 'challenges' },
);
