import mongoose from "mongoose";
import Activity from "../models/Activity.js";

export const fetchActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const completeActivity = async (req, res) => {
    const id  = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `Invalid activity ID: ${id}` });
    }
  
    try {
      const updatedActivity = await Activity.findById(id);
  
      if (!updatedActivity) {
        return res.status(404).json({ message: `No activity found with id: ${id}` });
      }

      updatedActivity.completed = true;
      await updatedActivity.save();
  
      res.status(200).json(updatedActivity);
    } catch (error) {
      res.status(500).json({ message: "Failed to update activity", error: error.message });
    }
  };