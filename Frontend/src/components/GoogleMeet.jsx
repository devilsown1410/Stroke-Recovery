import { useState } from "react";
import axios from 'axios'

const GoogleMeet = () => {
    const [meetLink, setMeetLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const createMeeting = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get("http://localhost:8080/create-meeting");
            setMeetLink(response.data.meetLink);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 text-center">
            <button
                className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
                onClick={createMeeting}
                disabled={loading}
            >
                {loading ? "Creating..." : "Create Google Meet"}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {meetLink && (
                <p className="mt-4">
                    <a href={meetLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Join Meeting
                    </a>
                </p>
            )}
        </div>
    );
};

export default GoogleMeet;
