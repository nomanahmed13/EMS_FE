import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Validate email and password
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }
  
    setMessage("");
    setLoading(true);
  
    try {
      const response = await axios.post(
        "http://localhost:5001/users/login",
        { email, password },
        { withCredentials: true }
      );
  
      const { token, role } = response.data; // Extract token and role from API response
  
      // Save token and role in localStorage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", email);
  
      setMessage("Login successful!");
      setUser(response.data.user); // If your backend sends user details
      setLoading(false);
      setRedirect(true); // Trigger navigation after successful login
    } catch (error) {
      setLoading(false);
  
      if (error.response) {
        // Backend sent a specific error response
        const errorMessage = error.response.data.message;
  
        if (errorMessage === "Invalid password") {
          setMessage("Incorrect password. Please try again.");
        } else if (errorMessage === "User not found") {
          setMessage("Email is not registered. Please sign up.");
        } else {
          setMessage(errorMessage || "An error occurred. Please try again.");
        }
      } else {
        // General error
        setMessage("An error occurred. Please check your internet connection.");
      }
    }
  };
  

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex w-full h-full lg:ml-24 px-10 py-10 justify-between place-items-center mt-20">
      <div className="bg-white w-full sm:w-full md:w-1/2 lg:w-1/3 px-7 py-7 rounded-xl justify-center align-middle">
        <form className="flex flex-col w-auto items-center" onSubmit={handleLogin}>
          <h1 className="px-3 font-extrabold mb-5 text-primary-dark text-2xl">Sign In</h1>

          {/* Display error or success messages */}
          {message && <div className="text-red-600 mb-4 text-center">{message}</div>}

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
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-et"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              required
            />
            <div type="button" className="" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path
                    fillRule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                  <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                </svg>
              )}
            </div>
          </div>
          <div className="w-full py-4">
            <button type="submit" className="primary w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
          <div className="container2 ">
            <div className="w-full h-full p-1">
              <Link to={"/register"}>
                <button className="text-black cursor-pointer rounded w-full h-full font-bold">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
          <Link to={"/"} className="">
            <button className="secondary">
              Back
            </button>
          </Link>
        </form>
      </div>
      <div className="hidden lg:flex flex-col right-box">
        <div className="flex flex-col -ml-96 gap-3">
          <div className="text-3xl font-black">Welcome to</div>
          <div>
            <img src="../src/assets/logo.png" alt="" className="w-48" />
          </div>
        </div>
        <div className="-ml-48 w-80 mt-12">
          <img src="../src/assets/signinpic.svg" alt="" className="w-full" />
        </div>
      </div>
    </div>
  );
}
