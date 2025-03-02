import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch available doctors
    axios
      .get("/api/doctors") // Update with your API endpoint
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  const fetchAppointments = (doctorId) => {
    setSelectedDoctor(doctorId);
    axios
      .get(`/api/appointments?doctorId=${doctorId}`)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  };

  const bookAppointment = () => {
    if (!selectedDoctor || !selectedSlot) {
      alert("Please select a doctor and a time slot.");
      return;
    }

    axios
      .post("/api/book-appointment", {
        doctorId: selectedDoctor,
        slot: selectedSlot,
      })
      .then(() => alert("Appointment booked successfully!"))
      .catch((error) => console.error("Error booking appointment:", error));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Book a Doctor Appointment</h2>

      <label className="block mb-2">Select Doctor:</label>
      <select
        className="w-full p-2 border rounded-md"
        onChange={(e) => fetchAppointments(e.target.value)}
      >
        <option value="">-- Choose a Doctor --</option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name} ({doctor.specialization})
          </option>
        ))}
      </select>

      {appointments.length > 0 && (
        <>
          <label className="block mt-4 mb-2">Available Slots:</label>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => setSelectedSlot(e.target.value)}
          >
            <option value="">-- Choose a Slot --</option>
            {appointments.map((slot, index) => (
              <option key={index} value={slot.time}>
                {slot.time}
              </option>
            ))}
          </select>
        </>
      )}

      <button
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        onClick={bookAppointment}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorAppointment;
