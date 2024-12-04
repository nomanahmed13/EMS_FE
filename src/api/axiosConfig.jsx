import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001", // Add your backend base URL here
});

// Optional: Add interceptors for headers or error handling
API.interceptors.request.use(
  (config) => {
    // You can add tokens or other headers if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default API;
