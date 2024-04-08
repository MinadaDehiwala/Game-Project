import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSpinner,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "axios";
import ReactConfetti from "react-confetti";
import Swal from "sweetalert2";
import YouTube from "react-youtube";
import Button from 'react-bootstrap/Button';


const Game = () => {
  const [level, setLevel] = useState(1);
  const [timer, setTimer] = useState(180);
  const [imageURL, setImageURL] = useState("");
  const [solution, setSolution] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSadRain, setShowSadRain] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const countdownRef = useRef(null);
  const playerRef = useRef(null);

  const updateHighestScore = async (currentScore) => {
    try {
      const response = await axios.get("http://localhost:3000/profile", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:5173",
          "Access-Control-Allow-Credentials": "true",
        },
      });
  
      if (response.status === 200) {
        const { email, score } = response.data;
        if (score < currentScore) {
          console.log(score,currentScore); 
          const updateResponse = await axios.put(
            "http://localhost:3000/profile/score",
            { email, currentScore },
            {
              withCredentials: true,
              headers: {
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Access-Control-Allow-Credentials": "true",
              },
            }
          );
          console.log(updateResponse)
  
          if (updateResponse.status === 200) {
            console.log("Score updated successfully!");
          } else {
            console.error("Failed to update score.");
          }
        }
      } else {
        console.error("Failed to fetch user profile.");
      }
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  const handleLevelComplete = async () => {
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
        setGameCompleted(true);
        await updateHighestScore(calculateScore()); // Update the highest score after completing the game
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
          const newScore = score + calculateScore();
          setScore(newScore);
          await updateHighestScore(newScore); // Update the highest score after completing a level
        }
      }
    } catch (error) {
      console.error("Error displaying SweetAlert2:", error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [level]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const fetchQuestion = () => {
    setLoading(true); // Set loading to true before fetching the question
    axios
      .get("https://marcconrad.com/uob/tomato/api.php")
      .then((response) => {
        const { question, solution } = response.data;
        setImageURL(question);
        setSolution(solution);
        resetTimer();
        setLoading(false); // Set loading to false after fetching the question
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
        setMessage("Failed to fetch the question. Please try again later.");
        setLoading(false); // Set loading to false in case of an error
      });
  };

  const resetTimer = () => {
    switch (level) {
      case 10:
        setTimer(10);
        break;
      default:
        setTimer(180 - level * 10);
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(countdown); // Stop the timer if it reaches 0
          handleTimeOut(); // Handle timeout
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    countdownRef.current = countdown;

    return () => clearInterval(countdown);
  }, [level, gameCompleted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const stringAnswer = answer.toString();
    const stringSolution = solution.toString();
    if (stringAnswer === stringSolution) {
      clearInterval(countdownRef.current); // Stop the timer when the answer is correct
      handleLevelComplete();
    } else {
      handleWrongAnswer();
    }
    clearInterval(countdownRef.current); // Clear the interval when the user submits an answer
  };
  

  const handleTimeOut = async () => {
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
        setTimeout(() => setShowSadRain(false), 5000); // Hide sad rain after 5 seconds
      }
    } catch (error) {
      console.error("Error displaying SweetAlert2:", error);
    }
  };

  const handleWrongAnswer = async () => {
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
        await updateHighestScore(); // Update the highest score before resetting the score
        setScore(0);
        setShowSadRain(true);
        setTimeout(() => setShowSadRain(false), 5000); // Hide sad rain after 5 seconds
        fetchQuestion(); // Fetch a new question for level 1
      }
    } catch (error) {
      console.error("Error displaying SweetAlert2:", error);
    }
  };


  const calculateScore = () => {
    const timeRemaining = timer;
    const maxScore = 1000; // Maximum score per level
    const minScore = 100; // Minimum score per level

    // Calculate the score based on the remaining time
    const score = Math.round(
      (timeRemaining / (180 - level * 10)) * maxScore + minScore
    );

    return score;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (playerRef.current) {
      playerRef.current.internalPlayer.mute();
    }
  };

  const handleYouTubeReady = (event) => {
    event.target.playVideo();
    if (isMuted) {
      event.target.mute();
    }
    playerRef.current = event.target;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="game-container"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "-5vh",
        position: "relative",
      }}
    >
      <MDBContainer
        fluid
        className="d-flex align-items-start justify-content-center p-6"
        style={{ paddingTop: "0vh" }}
      >
        <MDBCard
          className="m-5"
          style={{
            width: "80%",
            maxWidth: "800px",
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "20px",
            visibility: loading ? "hidden" : "visible",
          }}
        >
          <MDBCardBody className="px-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="level text-center">Level {level}</h1>
              <Button
  variant="outline-secondary"
  onClick={toggleMute}
  style={{ fontSize: "1.2rem" }}
>
  {isMuted ? "Unmute Sounds" : "Mute Sounds"}
</Button>
            </div>
            <div
              className="timer"
              style={{ fontSize: "2rem", textAlign: "right" }}
            >
              {formatTime(timer)} left
            </div>
            <h2 className="score">Score: {score}</h2>
            <img
              src={imageURL}
              alt="Question"
              className="question-image"
              style={{
                maxWidth: "100%",
                height: "auto",
                marginBottom: "20px",
              }}
            />
            <div className="mb-4 d-flex align-items-center justify-content-center">
              <label
                htmlFor="answer"
                className="form-label"
                style={{ fontSize: "1.5rem", marginBottom: "25px" }}
              >
                Answer:
              </label>
              <MDBInput
                wrapperClass="mb-4"
                size="lg"
                id="answer"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                style={{ marginLeft: "10px", marginRight: "10px" }}
              />
              <button
                type="submit"
                className="btn btn-success bg-green-500 w-40"
                style={{ marginLeft: "25px", marginBottom: "20px" }}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            {message && <div className="message">{message}</div>}
            <select
              className="form-select mt-3"
              onChange={(e) => setLevel(Number(e.target.value))}
              value={level}
              style={{ width: "50%" }}
            >
              {[...Array(10)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  Level {index + 1}
                </option>
              ))}
            </select>
            <button
              className="btn btn-primary mt-3"
              onClick={() => window.location.href = "/menu"}
            >
              Main Menu
            </button>
          </MDBCardBody>
        </MDBCard>
        {loading && (
          <div className="text-center">
            <MDBSpinner role="status">
              <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
          </div>
        )}
      </MDBContainer>

      {showConfetti && (
        <ReactConfetti numberOfPieces={1000} recycle={false} />
      )}


      {/* Background music */}
      <div className="youtube-player">
        <YouTube
          videoId="FFfdyV8gnWk"
          opts={{
            height: "0",
            width: "0",
            playerVars: {
              autoplay: 1,
              mute: isMuted ? 1 : 0,
            },
          }}
          onReady={handleYouTubeReady}
        />
      </div>
    </motion.div>
  );
};

export default Game;