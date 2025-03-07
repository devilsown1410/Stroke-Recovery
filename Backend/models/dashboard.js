import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
});

const Dashboard = mongoose.model('Games', dashboardSchema);
export default Dashboard