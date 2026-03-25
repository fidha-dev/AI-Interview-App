import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Interview.css";

const Interview = ({ setIsLoggedIn }) => {
  const [role, setRole] = useState("Frontend Developer");
  const [difficulty, setDifficulty] = useState("Easy");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [history, setHistory] = useState([]);

  const API = "http://localhost:5001/api/interview";

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  // ✅ VOICE FIX
  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice not supported in this browser. Use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      setAnswer(event.results[0][0].transcript);
    };

    recognition.onerror = () => {
      alert("Voice error. Allow microphone.");
    };
  };

  // ✅ GET QUESTION (useCallback)
  const getQuestion = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/question/${role}/${difficulty}`);
      setQuestion(res.data.question);
      setAnswer("");
      setFeedback(null);
    } catch (err) {
      console.error(err);
    }
  }, [role, difficulty]);

  // ✅ NEXT QUESTION
  const nextQuestion = () => {
    getQuestion();
  };

  // ✅ GET FEEDBACK
  const getFeedback = async () => {
    try {
      const res = await axios.post(`${API}/feedback`, {
        answer,
        role,
        difficulty,
        question,
      });

      setFeedback(res.data.feedback);
      loadHistory();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ HISTORY (useCallback)
  const loadHistory = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/history`);
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // ✅ FIXED useEffect
  useEffect(() => {
    getQuestion();
    loadHistory();
  }, [getQuestion, loadHistory]);

  return (
    <div className="main">
      {/* Navbar */}
      <div className="navbar">
        <h2>🚀 InterviewAce AI</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="container">
        {/* LEFT */}
        <div className="card">
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Full Stack Developer</option>
            <option>Python Developer</option>
          </select>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <div className="question-box">{question}</div>

          <button onClick={startVoice}>🎙 Speak Answer</button>

          <textarea
            placeholder="Write your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <button onClick={getFeedback}>Get Feedback</button>

          <button onClick={nextQuestion} className="secondary">
            Next Question
          </button>

          {feedback && (
            <div className="feedback">
              <h3>Score: {feedback.score}/10</h3>
              <p><b>Strengths:</b> {feedback.strengths}</p>
              <p><b>Improvements:</b> {feedback.improvements}</p>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="history">
          <h3>📜 History</h3>
          {history.map((item, i) => (
            <div key={i} className="history-item">
              <p>{item.role} ({item.difficulty})</p>
              <p>Score: {item.score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interview;