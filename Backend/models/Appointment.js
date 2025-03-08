import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    day: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Upcoming', 'Cancelled', 'Completed'],
        default: 'Upcoming'
    },
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
