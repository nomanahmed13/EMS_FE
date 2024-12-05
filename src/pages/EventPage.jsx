import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillCalendar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";

export default function EventPage() {
  const [events, setEvents] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [userRequests, setUserRequests] = useState({}); // To track request statuses
  const [eventRequests, setEventRequests] = useState([]); // To track users requesting for events

  // Fetch user role from localStorage
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  // Fetch events and user requests
  useEffect(() => {
    const fetchEventsAndRequests = async () => {
      try {
        const eventResponse = await axios.get("http://localhost:5001/events");
        setEvents(eventResponse.data);

        if (userRole === "admin") {
          // Fetch requests only if the user is admin
          const requestResponse = await axios.get("http://localhost:5001/registration/requests", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          });
          setEventRequests(requestResponse.data); // All requests for admin to manage
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchEventsAndRequests();
  }, [userRole]);

  const handleRegister = async (eventId) => {
    try {
      await axios.post(
        "http://localhost:5001/registration/register",
        { event: eventId, email: localStorage.getItem("userEmail") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      setUserRequests({ ...userRequests, [eventId]: "pending" });
    } catch (error) {
      console.error("Error during registration:", error.response?.data || error.message);
      alert("Failed to register. Please try again.");
    }
  };

  const handleRequestAction = async (requestId, action) => {
    try {
      const endpoint =
        action === "approve" ? "http://localhost:5001/registration/approveRequest" : "http://localhost:5001/registration/rejectRequest";
      await axios.post(
        endpoint,
        { requestId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      // Update the event requests list by removing the processed request
      setEventRequests(eventRequests.filter((req) => req._id !== requestId));
    } catch (error) {
      console.error("Error updating request status:", error.response?.data || error.message);
      alert("Failed to update request status. Please try again.");
    }
  };

  const handleUpdate = async (eventId) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/events/${eventId}`,
        {
          /* Add your update payload here */
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      alert(response.data.message || "Event updated successfully!");

      // Refresh the events list
      const updatedEvents = await axios.get("http://localhost:5001/events");
      setEvents(updatedEvents.data);
    } catch (error) {
      console.error("Error updating event:", error.response?.data || error.message);
      alert("Failed to update event. Please try again.");
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await axios.delete(`http://localhost:5001/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      alert(response.data.message || "Event deleted successfully!");

      // Remove the deleted event from the state
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error.response?.data || error.message);
      alert("Failed to delete event. Please try again.");
    }
  };

  if (events.length === 0) {
    return <div className="text-center mt-20">No Events Found!</div>;
  }

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
            {userRole === "user" && (
              <button
                className={`block w-full text-center text-white font-bold py-3 rounded-lg transition-all duration-300 ease-in-out transform ${userRequests[event._id] === "approved"
                    ? "bg-green-500"
                    : userRequests[event._id] === "rejected"
                      ? "bg-red-500"
                      : userRequests[event._id] === "pending"
                        ? "bg-yellow-500"
                        : "bg-primary hover:bg-black"
                  }`}
                disabled={userRequests[event._id] !== undefined}
                onClick={() => handleRegister(event._id)}
              >
                {userRequests[event._id] === "approved"
                  ? "Request Approved"
                  : userRequests[event._id] === "rejected"
                    ? "Request Rejected"
                    : userRequests[event._id] === "pending"
                      ? "Request Pending"
                      : "Register"}
              </button>
            )}
            {userRole === "admin" && (
              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-all duration-200"
                  onClick={() => handleUpdate(event._id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition-all duration-200"
                  onClick={() => handleDelete(event._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Admin-only: List of user requests */}
      {userRole === "admin" && eventRequests.length > 0 && (
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-5">User Requests</h2>
          <table className="w-full table-auto bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Event Title</th>
                <th className="px-4 py-2 text-left">User Email</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {eventRequests.map((request) => (
                <tr key={request._id} className="border-t">
                  <td className="px-4 py-2">{request.eventId.title}</td>
                  <td className="px-4 py-2">{request.userId.email}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-all duration-200 mr-2"
                      onClick={() => handleRequestAction(request._id, "approve")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition-all duration-200"
                      onClick={() => handleRequestAction(request._id, "reject")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
