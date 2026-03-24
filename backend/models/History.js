const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  role: String,
  difficulty: String,
  question: String,
  answer: String,
  score: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("History", historySchema);