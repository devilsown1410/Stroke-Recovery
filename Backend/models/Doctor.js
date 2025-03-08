const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialist: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  consultationFee: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  availability: {
    days: [{ type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] }],
    timeSlots: [{ type: String }],
  },
  appointments: [
    {
      patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
      date: { type: Date, required: true },
      status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" },
    },
  ],

}, {collection:'DrData'});

module.exports = mongoose.model('DoctorsData', doctorSchema);
