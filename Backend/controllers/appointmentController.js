import mongoose from "mongoose";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

export const createAppointment = async (req, res) => {
    console.log("Received Data:", req.body);

    try {
        const { userId, doctorId, date, day, timeSlot } = req.body;
        if (!userId || !doctorId || !date || !day || !timeSlot) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ message: "Invalid doctorId format" });
        }
        
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const doctorObjectId = new mongoose.Types.ObjectId(doctorId);
        
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });
        if (!doctor.availability?.days?.includes(day)) {
            return res.status(400).json({ message: `Doctor is not available on ${day}` });
        }

        // Create new appointment
        const newAppointment = new Appointment({
            userId,
            doctorId,
            date,
            day,
            timeSlot
        });

        await newAppointment.save();
        res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });

    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({ message: "Error creating appointment", error });
    }
};

export const getUserAppointments = async (req, res) => {
    try {
        const { userId } = req.params;
        const appointments = await Appointment.find({ userId }).populate("doctorId", "name specialist");
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments", error });
    }
};

export const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status: "Cancelled" },
            { new: true }
        );
        res.json({ message: "Appointment cancelled", appointment: updatedAppointment });
    } catch (error) {
        res.status(500).json({ message: "Error cancelling appointment", error });
    }
};

// Mark an appointment as completed
// export const completeAppointment = async (req, res) => {
//     try {
//         const { appointmentId } = req.params;
//         const updatedAppointment = await Appointment.findByIdAndUpdate(
//             appointmentId,
//             { status: "Completed" },
//             { new: true }
//         );
//         res.json({ message: "Appointment marked as completed", appointment: updatedAppointment });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating appointment", error });
//     }
// };
