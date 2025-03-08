import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserMd, FaMapMarkerAlt, FaClock, FaEnvelope, FaPhone } from "react-icons/fa";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const modalStyles = {
    content: {
        width: "400px",
        margin: "auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
    }
};

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState("All");
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    
    // Assign a random userId if it's just for testing
    const [appointmentData, setAppointmentData] = useState({
        userId: JSON.parse(localStorage.getItem("crUser"))._id, // Temporary until actual userId is available
        doctorId: "",
        date: "",
        day: "",
        timeSlot: ""
    });
    const [selectedDay, setSelectedDay] = useState("");
    const navigate=useNavigate();
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.post("http://localhost:8080/api/all-doctor");
                setDoctors(response.data);
                setFilteredDoctors(response.data);

                const uniqueSpecialties = ["All", ...new Set(response.data.map((doc) => doc.specialist || doc.specialization))];
                setSpecialties(uniqueSpecialties);
            } catch (error) {
                console.error("Error fetching doctors: ", error);
            }
        };
        fetchDoctors();
    }, []);    
    const filterBySpecialty = (specialty) => {
        setSelectedSpecialty(specialty);
        if (specialty === "All") {
            setFilteredDoctors(doctors);
        } else {
            setFilteredDoctors(doctors.filter((doc) => doc.specialist === specialty || doc.specialization === specialty));
        }
    };

    const openModal = (doctor) => {
        setSelectedDoctor(doctor);
        setAppointmentData({ ...appointmentData, doctorId: doctor._id });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedDoctor(null);
    };

    const handleInputChange = (e) => {
        setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/appointments/create", appointmentData);
            navigate('/dashboard')
            closeModal();
        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    };

    const getNextDay = (selectedDay) => {
        const today = new Date();
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeekIndex = daysOfWeek.indexOf(selectedDay);
        const currentDayOfWeek = today.getDay();
        let daysUntilNextDay = (dayOfWeekIndex - currentDayOfWeek + 7) % 7; // Days until next selected day

        if (daysUntilNextDay === 0) {
            daysUntilNextDay = 7; // If today is the selected day, get the next one
        }

        let nextDay = new Date();
        nextDay.setDate(today.getDate() + daysUntilNextDay);

        const nextDays = [];
        for (let i = 0; i < 4; i++) {
            nextDays.push(new Date(nextDay)); // Push the next day
            nextDay.setDate(nextDay.getDate() + 7); // Increment by 7 days for the next week
        }

        return nextDays;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Find Your Doctor</h2>

            {/* Specialization Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
                {specialties.map((specialty) => (
                    <button
                        key={specialty}
                        className={`px-4 py-2 rounded-full font-medium transition-all
                            ${selectedSpecialty === specialty
                                ? "bg-blue-600 text-white shadow-lg"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        onClick={() => filterBySpecialty(specialty)}
                    >
                        {specialty}
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor) => (
                    <div key={doctor._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <FaUserMd className="text-blue-500" /> {doctor.name}
                        </h3>
                        <p className="text-gray-600 mt-1">
                            <strong>Specialist:</strong> {doctor.specialist || doctor.specialization}
                        </p>
                        <p className="text-gray-600"><strong>Experience:</strong> {doctor.experience} years</p>
                        <p className="text-gray-600 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-red-500" /> <strong>Address:</strong> {doctor.address || "Not Provided"}
                        </p>
                        <p className="text-gray-600"><strong>Consultation Fee:</strong> ₹{doctor.consultationFee || "N/A"}</p>

                        <div className="mt-3">
                            <p className="text-gray-600 flex items-center gap-2">
                                <FaEnvelope className="text-blue-500" /> {doctor.email}
                            </p>
                            {doctor.contact?.phone && (
                                <p className="text-gray-600 flex items-center gap-2">
                                    <FaPhone className="text-green-500" /> {doctor.contact.phone}
                                </p>
                            )}
                        </div>

                        <div className="mt-3">
                            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <FaClock className="text-yellow-500" /> Availability:
                            </h4>
                            <p className="text-gray-500">
                                <strong>Days:</strong> {doctor.availability?.days?.join(", ") || "Not Available"}
                            </p>
                            <p className="text-gray-500">
                                <strong>Time Slots:</strong> {doctor.availability?.timeSlots?.join(", ") || "Not Available"}
                            </p>
                        </div>

                        <button
                            onClick={() => openModal(doctor)}
                            className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all"
                        >
                            Schedule an Appointment
                        </button>
                    </div>
                ))}
            </div>

            {showModal && selectedDoctor && (
                <Modal isOpen={showModal} onRequestClose={closeModal} style={modalStyles}>
                    <h3 className="text-xl font-bold">Book Appointment with {selectedDoctor.name}</h3>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <label className="block">Day:</label>
                        <select
                            name="day"
                            onChange={(e) => {
                                handleInputChange(e);
                                setSelectedDay(e.target.value); // Store selected day in state
                            }}
                            required
                            className="border p-2 w-full rounded"
                        >
                            {selectedDoctor.availability?.days?.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>

                        <label className="block">Date:</label>
                        <select
                            name="date"
                            onChange={handleInputChange}
                            required
                            className="border p-2 w-full rounded"
                        >
                            {selectedDay && getNextDay(selectedDay).map((nextDay, index) => (
                                <option key={index} value={nextDay.toDateString()}>
                                    {nextDay.toDateString()}
                                </option>
                            ))}
                        </select>

                        <label className="block">Time Slot:</label>
                        <select
                            name="timeSlot"
                            onChange={handleInputChange}
                            required
                            className="border p-2 w-full rounded"
                        >
                            {selectedDoctor.availability?.timeSlots?.map(slot => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>

                        <button type="submit" className="w-full bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-700 transition-all">
                            Confirm Appointment
                        </button>
                    </form>
                </Modal>
            )}

        </div>
    );
};

export default DoctorList;
