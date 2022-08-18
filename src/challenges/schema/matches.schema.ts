import * as mongoose from 'mongoose';

export const MatchesSchema = new mongoose.Schema(
  {
    def: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    result: [{ type: String }],
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
  },
  { timestamps: true, collection: 'matches' },
);
