import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    contactNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    streak : { type: Number, default: 0},

    diseaseHistory: [
      {
        diseaseName: { type: String, required: true },
        detectedOn: { type: Date, required: true },
        diagnosisStartedOn: { type: Date, default: null },
        recoveryProgress: {
          currentStage: { type: String, default: "Not Started" },
          completedStages: { type: [String], default: [] },
          nextSteps: { type: String, default: "Consult your doctor for further steps." },
        },
        treatmentDetails: {
          medications: [
            {
              name: { type: String, default: "" },
              dosage: { type: String, default: "" },
              frequency: { type: String, default: "" },
            },
          ],
          therapies: [
            {
              type: { type: String, default: "" },
              sessionsCompleted: { type: Number, default: 0 },
              totalSessions: { type: Number, default: 0 },
            },
          ],
          doctorNotes: { type: String, default: "No notes available." },
        },
        recoveryPointsEarned: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User
