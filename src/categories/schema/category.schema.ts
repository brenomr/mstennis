import * as mongoose from 'mongoose';

export const CategoriesSchema = new mongoose.Schema(
  {
    category: { type: String, unique: true },
    description: { type: String },
    events: [
      {
        name: { type: String },
        operation: { type: String },
        points: { type: String },
      },
    ],
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'players',
      },
    ],
  },
  { timestamps: true, collection: 'categories' },
);
