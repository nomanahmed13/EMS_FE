import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillCalendar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";

export default function EventPage() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [email, setEmail] = useState("");

  // Fetch events
  useEffect(() => {
    axios
      .get("http://localhost:5001/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  if (events.length === 0) {
    return <div className="text-center mt-20">No Events Found!</div>;
  }

  const handleRegistration = async () => {
    try {
      const response = await axios.post("http://localhost:5001/registration/registerWithEmail", {
        event: selectedEvent,
        email,
      });
      alert(response.data.message);
      setShowModal(false);
      setEmail("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle "already registered" error
        alert(error.response.data.message);
      } else {
        console.error("Error during registration:", error.response?.data || error.message);
        alert("Failed to register. Please try again.");
      }
    }
  };

  const openModal = (eventId) => {
    setSelectedEvent(eventId);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto px-5 py-10 bg-dark flex-col">
      <h1 className="text-4xl font-extrabold text-center mb-10">Upcoming Events</h1>
      <div className="grid grid-cols-1 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-3">{event.title}</h2>
            <p className="text-gray-700 mb-4">{event.description}</p>
            <p className="text-red-700 mb-4 font-bold">Ticket Price: {event.ticketPrice}/-</p>
            <div className="text-sm text-gray-600 mb-2">
              <span className="block">
                <AiFillCalendar className="inline mr-2" />
                {new Date(event.eventDate).toLocaleDateString()} at {event.eventTime}
              </span>
              <span className="block">
                <MdLocationPin className="inline mr-2" />
                {event.location}
              </span>
            </div>
            <button
              className={`block w-full text-center bg-primary text-white font-bold py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-black`}
              onClick={() => openModal(event._id)}
            >
              Register
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-md">
          <div className="bg-gray-100 rounded-lg p-8 w-1/3 shadow-lg">
            <h3 className="text-3xl font-bold mb-6 text-center">Register for Event</h3>
            <label className="block mb-3 text-gray-800 font-medium text-lg">Email:</label>
            <input
              type="email"
              className="w-full px-4 py-3 border rounded-lg mb-6 text-gray-800 focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-all duration-200"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-200"
                onClick={handleRegistration}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
