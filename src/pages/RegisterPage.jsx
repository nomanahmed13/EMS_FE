import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001", // Use your backend URL here
});

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function registerUser(ev) {
    ev.preventDefault();

    // Validation
    if (!username) {
      setMessage("Username is required.");
      return;
    }
    if (!email || !email.includes("@")) {
      setMessage("A valid email is required.");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage(""); // Clear any previous messages
    setLoading(true); // Show loading state

    try {
      const response = await API.post("/users/register", {
        username,
        email,
        password,
        role, // Include the selected role
      });
      setMessage("Registration successful!");
      setRedirect(true); // Redirect only after the API call succeeds
    } catch (e) {
      setMessage(
        e.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Hide loading state
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex w-full h-full lg:-ml-24 px-10 py-10 justify-between place-items-center mt-12">
      <div className="hidden lg:flex flex-col right-box">
        <div className="flex flex-col gap-3">
          <div className="text-3xl font-black">Welcome to</div>
          <div>
            <img src="../src/assets/logo.png" alt="" className="w-48" />
          </div>
        </div>
        <div className="ml-48 w-80 mt-6">
          <img src="../src/assets/signuppic.svg" alt="" className="w-full" />
        </div>
      </div>
      <div className="bg-white w-full sm:w-full md:w-1/2 lg:w-1/3 px-7 py-7 rounded-xl justify-center align-middle">
        <form className="flex flex-col w-auto items-center" onSubmit={registerUser}>
          <h1 className="px-3 font-extrabold mb-5 text-primarydark text-2xl">
            Sign Up
          </h1>

          {message && <div className="text-red-600 mb-4 text-center">{message}</div>}

          <div className="input">
            <input
              type="text"
              placeholder="Username"
              className="input-et"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
              required
            />
          </div>

          <div className="input">
            <input
              type="email"
              placeholder="Email"
              className="input-et"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              required
            />
          </div>

          <div className="input">
            <input
              type="password"
              placeholder="Password"
              className="input-et"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              required
            />
          </div>

          <div className="input">
            <input
              type="password"
              placeholder="Confirm Password"
              className="input-et"
              value={confirmPassword}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              required
            />
          </div>

          <div className="input">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="w-full py-4">
            <button
              type="submit"
              className="primary w-full"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>

          <div className="container2">
            <div className="w-full h-full p-1">
              <Link to={"/login"}>
                <button
                  type="button"
                  className="text-black cursor-pointer rounded w-full h-full font-bold"
                >
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
