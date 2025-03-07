import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  points: { type: Number, required: true },
  category: { type: String, enum: ["Physical", "Cognitive", "Speech"], required: true },
  completed: { type: Boolean, default: false }
});

const Activity = mongoose.model("Activity", activitySchema);

export default Activity