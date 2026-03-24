const express = require("express");
const router = express.Router();
const questions = require("../data/questions.json");
const History = require("../models/History");

// ✅ GET Question
router.get("/question/:role/:difficulty", (req, res) => {
  const { role, difficulty } = req.params;

  const roleData = questions[role];
  const difficultyData = roleData?.[difficulty];

  if (!difficultyData) {
    return res.json({ question: "Not found" });
  }

  const random =
    difficultyData[Math.floor(Math.random() * difficultyData.length)];

  res.json({ question: random });
});

// ✅ POST Feedback + SAVE
router.post("/feedback", async (req, res) => {
  const { answer, role, difficulty, question } = req.body;

  let score = answer.length > 120 ? 9 : answer.length > 60 ? 7 : 5;

  try {
    const history = new History({
      role,
      difficulty,
      question,
      answer,
      score,
    });

    await history.save();

    res.json({
      feedback: {
        score,
        strengths: "Good attempt",
        improvements: "Add more examples",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save history" });
  }
});

// ✅ GET History
router.get("/history", async (req, res) => {
  try {
    const data = await History.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

module.exports = router;