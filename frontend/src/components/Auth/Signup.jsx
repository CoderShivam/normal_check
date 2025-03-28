import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Show loading state

    try {
      // API call to register user
      const response = await axios.post("http://localhost:4000/user/register", {
        name,
        email,
        password,
      },
      {
        withCredentials : true,
        headers : {"Content-Type" : "application/json"},
      }
    );
      
      setTimeout(()=>{
        toast.success("Registration successful!");
        setTimeout(()=>{
          navigate("/arena");
        },1000); 
      },1000);
       // Redirect to Login after delay

      console.log(response.data); // Log response for debugging
    } catch (error) {
      // Enhanced error handling
      const errorMessage =
        error.response?.data?.message || "Failed to register. Please try again.";
      console.error(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          {/* Input for Name */}
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-label="Enter your name"
            />
          </div>

          {/* Input for Email */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Enter your email"
            />
          </div>

          {/* Input for Password */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="register-btn"
            disabled={loading}
            aria-label="Register"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <div className="redirect-link">
          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;