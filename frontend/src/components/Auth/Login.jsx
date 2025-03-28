import { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { useAuth } from "../../context/AuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for button loading
  const navigate = useNavigate();
  const { setUser } = useAuth();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:4000/user/login", {
        email,
        password,
      },
      {
        withCredentials : true,
        headers : {"Content-Type" : "application/json"},
      }
    );
      setUser(response.data.user); // Set user data after login
      console.log(response.data.token);
      console.log("Login successful:", response.data);
      navigate("/arena"); // Redirect to Arena on success
    } catch (error) {
     
      console.error(error.response?.data?.message || "Login failed");
      alert(error.response?.data?.message || "Invalid credentials");
    } 
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;