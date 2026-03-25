import React, { useState } from "react";
import "./Role.css";
import { useNavigate } from "react-router-dom";

function Role() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!role) {
      alert("Enter role");
      return;
    }

    navigate("/interview", { state: { role } });
  };

  return (
    <div className="role-container">
      <div className="role-card">
        <h2>Select Your Role 🎯</h2>

        <input
          type="text"
          placeholder="Enter role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <button onClick={handleStart}>Start Interview</button>
      </div>
    </div>
  );
}

export default Role;