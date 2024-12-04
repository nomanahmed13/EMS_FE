/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state to handle asynchronous fetch

  // Configure Axios instance
  const API = axios.create({
    baseURL: "http://localhost:5001", // Replace with your backend URL
    withCredentials: true, // Include cookies (if needed)
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("jwtToken"); // Retrieve token from localStorage
        const { data } = await API.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authenticated requests
          },
        });
        setUser(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser(null); // Clear user if fetch fails
      } finally {
        setLoading(false); // Mark loading as false
      }
    };

    if (!user) {
      fetchProfile();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Optional loading spinner or message
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
