import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

// Create a new appointment
export const createAppointment = async (req, res) => {
    try {
        const { userId, doctorId, date, day, timeSlot } = req.body;

        // Ensure doctor exists
        const doctor = await DoctorsData.findById(doctorId);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        // Check if the doctor is available on the selected day
        if (!doctor.availability.days.includes(day)) {
            return res.status(400).json({ message: `Doctor is not available on ${day}` });
        }

        // Create appointment
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
