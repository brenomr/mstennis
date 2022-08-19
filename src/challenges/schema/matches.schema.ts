import * as mongoose from 'mongoose';

export const MatchesSchema = new mongoose.Schema(
  {
    def: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    result: [{ set: { type: String } }],
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
    category: { type: String },
  },
  { timestamps: true, collection: 'matches' },
);
