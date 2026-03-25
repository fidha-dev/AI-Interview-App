import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API = "http://localhost:5001/api/auth";

  // ✅ LOGIN
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      await axios.post(`${API}/login`, { email, password });

      localStorage.setItem("user", email);
      setIsLoggedIn(true);

    } catch (err) {
      alert("Invalid login");
    }
  };

  // ✅ SIGNUP
  const handleSignup = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      await axios.post(`${API}/signup`, { email, password });

      alert("Signup successful! Now login");

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="login-main">
      <div className="login-card">
        <h1>🚀 InterviewAce AI</h1>
        <p>Practice. Improve. Get Hired.</p>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <button className="signup" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;