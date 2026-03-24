const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ VALIDATION
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // ✅ CHECK EXISTING USER
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ email, password });
    await user.save();

    res.json({ message: "Signup successful" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Signup failed" });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Enter email and password" });
  }

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login success" });
});

module.exports = router;