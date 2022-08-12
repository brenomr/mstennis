import mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    name: { type: String },
    ranking: String,
    positionRanking: Number,
    urlPhotoPlayer: String,
  },
  { timestamps: true, collection: 'players' },
);
