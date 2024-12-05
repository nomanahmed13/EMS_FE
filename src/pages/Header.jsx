import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch events from the server
  useEffect(() => {
    axios.get("/events").then((response) => {
      setEvents(response.data);
    }).catch((error) => {
      console.error("Error fetching events:", error);
    });
  }, []);

  // Logout functionality
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5001/users/logout");
      if (response.status === 200) {
        localStorage.clear();
        setUser(null);
        navigate("/login");
      } else {
        console.error("Logout failed: Unexpected response status", response.status);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Check user role from localStorage
  const userRole = localStorage.getItem("userRole"); // Assuming role is stored in localStorage after login

  return (
    <div>
      <header className="flex py-2 px-6 sm:px-6 justify-between items-center bg-black text-white">
        {/* Logo on the left */}
        <Link to="/" className="flex items-center">
          <img src="../src/assets/logo.png" alt="Logo" className="w-26 h-9" />
        </Link>

        {/* Menu and account options on the right */}
        <div className="flex items-center gap-6">
          {/* Show Create Event Button only if user role is 'admin' */}
          {userRole === "admin" && (
            <Link to="/createEvent">
              <div className="flex flex-col items-center py-1 px-2 rounded text-primary cursor-pointer hover:text-primary-dark hover:bg-white hover:shadow-sm shadow-gray-200 transition-shadow duration-150">
                <button className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 stroke-3 text-primary hover:text-primary-dark"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
                <div className="font-bold text-sm text-primary hover:text-primary-dark">
                  Create Event
                </div>
              </div>
            </Link>
          )}

          {/* Events */}
          <Link to="/event">
            <div className="flex flex-col items-center py-1 px-2 rounded text-primary cursor-pointer hover:text-primary-dark hover:bg-white hover:shadow-sm shadow-gray-200 transition-shadow duration-150">
              <button className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 stroke-3 text-primary hover:text-primary-dark"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                  />
                </svg>
              </button>
              <div className="font-bold text-sm text-primary hover:text-primary-dark">Events</div>
            </div>
          </Link>

          {/* Calendar */}
          <Link to="/calendar">
            <div className="flex flex-col items-center py-1 px-2 rounded cursor-pointer text-primary hover:text-primary-dark hover:bg-white hover:shadow-sm shadow-gray-200 transition-shadow duration-150">
              <button className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-primary hover:text-primary-dark"
                >
                  <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                  <path
                    fillRule="evenodd"
                    d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 000-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="font-bold text-sm text-primary hover:text-primary-dark">Calendar</div>
            </div>
          </Link>

          {/* Show Account Button only if user is not signed in */}
          {user ? null : (
            <Link to="/useraccount">
              <button className="primary px-4 py-2 bg-primary text-white rounded">Account</button>
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:bg-red-100 rounded px-3 py-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-12m6-6 6 6-6 6"
              />
            </svg>
            Log out
          </button>
        </div>
      </header>
    </div>
  );
}
