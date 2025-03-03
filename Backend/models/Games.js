import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  src: {
    type: String, 
    required: true,
  },
  thumbnail: {
    type: String, 
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now, 
  },
}, {
  timestamps: false, 
});

const Games = mongoose.model('Games', gameSchema);
export default Games
