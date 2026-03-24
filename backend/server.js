const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/interviewAI")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ✅ ROUTES
const interviewRoutes = require("./routes/interview");
const authRoutes = require("./routes/auth");   // ⭐ ADD THIS

app.use("/api/interview", interviewRoutes);
app.use("/api/auth", authRoutes);             // ⭐ ADD THIS

// Server
app.listen(5001, () => {
  console.log("Server running on port 5001");
});