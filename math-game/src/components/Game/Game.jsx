// Game.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Game.css";
import axios from "axios";

const Game = () => {
  const [level, setLevel] = useState(1);
  const [timer, setTimer] = useState(120); // Initial timer value (2 minutes)
  const [imageURL, setImageURL] = useState("");
  const [solution, setSolution] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0); // Initial score value

  useEffect(() => {
    fetchQuestion();
  }, [level]); // Fetch new question when level changes

  const fetchQuestion = () => {
    axios.get("https://marcconrad.com/uob/tomato/api.php")
      .then(response => {
        const { question, solution } = response.data;
        setImageURL(question);
        setSolution(solution);
        resetTimer(); // Reset timer on new question
      })
      .catch(error => console.error("Error fetching question:", error));
  };

  const resetTimer = () => {
    setTimer(120 - level * 10); // Adjust timer duration based on level (decreasing by 10 seconds per level)
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setMessage("Time's up! Try again.");
      setTimeout(() => {
        setMessage("");
        setLevel(1); // Reset level on timeout
      }, 2000);
    }
  }, [timer]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const stringAnswer = answer.toString(); // Convert answer to string
    const stringSolution = solution.toString(); // Convert solution to string
    if (stringAnswer === stringSolution) { // Compare the string representations
      setMessage("Correct! Proceeding to next level.");
      setTimeout(() => {
        setMessage("");
        setLevel(prevLevel => prevLevel + 1);
        setScore(prevScore => prevScore + 1); // Increment score on correct answer
      }, 2000);
    } else {
      setMessage("Incorrect! Try again.");
      setTimeout(() => {
        setMessage("");
        setLevel(1); // Reset level on incorrect answer
      }, 2000);
    }
  };

  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="game-container"
    >
      <div className="game-box">
        <h1 className="level">Level {level}</h1>
        <h2 className="score">Score: {score}</h2>
        <div className="timer">{timer} seconds left</div>
        <img src={imageURL} alt="Question" className="question-image" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="answer" className="answer-label">
            Answer is:
          </label>
          <input
            type="text"
            id="answer"
            className="answer-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button type="submit" className="submit-button">Submit</button>
        </form>
        {message && <div className="message">{message}</div>}
        <button className="main-menu-button" onClick={() => window.location.href="/menu"}>Main Menu</button>
      </div>
    </motion.div>
  );
};

export default Game;
