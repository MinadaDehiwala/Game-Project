import Swal from "sweetalert2";
import { fetchQuestion } from "./api";

export const handleTimeOut = async (setLevel, setScore, setShowSadRain) => {
  try {
    const result = await Swal.fire({
      title: "Time's Up!",
      text: "You ran out of time. Try again from Level 1.",
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Try Again",
    });

    if (result.isConfirmed) {
      setLevel(1);
      setScore(0);
      setShowSadRain(true);
      setTimeout(() => setShowSadRain(false), 5000);
    }
  } catch (error) {
    console.error("Error displaying SweetAlert2:", error);
  }
};

export const handleWrongAnswer = async (setLevel, setScore, setAnswer, setShowSadRain, fetchQuestion) => {
  try {
    const result = await Swal.fire({
      title: "Oops...",
      text: "Incorrect answer. Try again from Level 1.",
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Try Again",
    });

    if (result.isConfirmed) {
      setLevel(1);
      setScore(0);
      setShowSadRain(true);
      setTimeout(() => setShowSadRain(false), 5000);
      fetchQuestion(); // Fetch a new question for level 1
    }
  } catch (error) {
    console.error("Error displaying SweetAlert2:", error);
  }
};

export const handleLevelComplete = async (level, setLevel, setScore, score, setAnswer, setShowConfetti, setShowSadRain) => {
  try {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);

    if (level === 10) {
      const result = await Swal.fire({
        title: "Congratulations!",
        text: "You have completed the game!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Main Menu",
      });

      if (result.isConfirmed) {
        window.location.href = "/menu";
      }
    } else {
      const result = await Swal.fire({
        title: "Level Complete!",
        text: "Proceed to the next level?",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Next Level",
      });

      if (result.isConfirmed) {
        setLevel(level + 1);
        setScore(score + calculateScore(level, timer));
        setAnswer(""); // Clear the answer input field
      }
    }
  } catch (error) {
    console.error("Error displaying SweetAlert2:", error);
  }
};

const calculateScore = (level, timer) => {
  const timeRemaining = timer;
  const maxScore = 1000;
  const minScore = 100;

  const score = Math.round(
    (timeRemaining / (180 - level * 10)) * maxScore + minScore
  );

  return score;
};
