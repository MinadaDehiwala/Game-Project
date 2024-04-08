import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import axios from "axios";
import ReactConfetti from "react-confetti";
import Swal from "sweetalert2";
import YouTube from "react-youtube";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


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
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const countdownRef = useRef(null);
  const playerRef = useRef(null);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  const handleMainMenuClick = () => {
    navigate('/menu');
  };

  const fetchNumberFact = async (number) => {
    try {
      const response = await axios.get(`http://numbersapi.com/${number}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching number fact:", error);
      return "Wait a Minute...This is not a Number!";
    }
  };
  const calculateScore = () => {
    const timeRemaining = timer;
    const maxScore = 1000;
    const minScore = 100;

    const score = Math.round(
      (timeRemaining / (180 - level * 10)) * maxScore + minScore
    );

    return score;
  };
  const handleLevelComplete = async () => {
    try {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
  
      const newScore = score + calculateScore(); // Assuming calculateScore() correctly calculates the new score
      setScore(newScore);
  
      // Update the score on the server
      try {
        const response = await fetch(`/api/users/profile/score?email=${userEmail}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            score: newScore, // Make sure to send the score in the request body
          }),
          credentials: "include", // Include cookies in the request
        });
    
        const data = await response.json();
        console.log("Score update response:", data);
      } catch (error) {
        console.error("Error updating score:", error);
      }
    
  
      // Level completion logic
      if (level === 10) {
        // Fetching a number fact for level 10
        const numberFact = await fetchNumberFact(10);
        const result = await Swal.fire({
          title: "Congratulations!",
          text: "You have completed the game!",
          html: `<p><strong>Did you know? </strong> ${numberFact}</p>`,
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Main Menu",
          allowOutsideClick: false,
        });
  
        if (result.isConfirmed) {
          window.location.href = "/menu";
        }
        setGameCompleted(true);
      } else {
        // Fetching a number fact for the next level
        const numberFact = await fetchNumberFact(level + 1);
        const result = await Swal.fire({
          title: "Level Complete!",
          text: "Proceed to the next level?",
          html: `<p><strong>Did you know? </strong> ${numberFact}</p>`,
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Next Level",
          allowOutsideClick: false,
        });
  
        if (result.isConfirmed) {
          setLevel(level + 1);
        }
      }
    } catch (error) {
      console.error("Error handling level completion:", error);
    }
  };
  

  useEffect(() => {
    fetchQuestion();
  }, [level]);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await axios.get("/api/users/profile/email", {
          withCredentials: true, // Include cookies in the request
        });
        setUserEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };
  
    fetchUserEmail();
  }, []);

  const fetchQuestion = () => {
    setLoading(true);
    axios
      .get("https://marcconrad.com/uob/tomato/api.php")
      .then((response) => {
        const { question, solution } = response.data;
        setImageURL(question);
        setSolution(solution);
        resetTimer();
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
        setMessage("Failed to fetch the question. Please try again later.");
        setLoading(false);
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
          clearInterval(countdown);
          handleTimeOut();
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
      clearInterval(countdownRef.current);
      handleLevelComplete();
    } else {
      handleWrongAnswer();
    }
    clearInterval(countdownRef.current);
  };

  const handleTimeOut = async () => {
    try {
      const numberFact = await fetchNumberFact(level);
      const result = await Swal.fire({
        title: "Time's Up!",
        text: "You ran out of time. Try again from Level 1.",
        html: `<p><strong>Did you know? </strong> ${numberFact}</p>`,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Try Again",
        allowOutsideClick: false,
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

  const handleWrongAnswer = async () => {
    try {
      const numberFact = await fetchNumberFact(answer);
      const result = await Swal.fire({
        title: "Oops...",
        text: "Incorrect answer. Try again from Level 1.",
        html: `<p><strong>Did you know? </strong> ${numberFact}</p>`,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Try Again",
        allowOutsideClick: false,
      });

      if (result.isConfirmed) {
        setLevel(1);
        setScore(0);
        setShowSadRain(true);
        setTimeout(() => setShowSadRain(false), 5000);
        fetchQuestion();
      }
    } catch (error) {
      console.error("Error displaying SweetAlert2:", error);
    }
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
            <div className="timer" style={{ fontSize: "2rem", textAlign: "right" }}>
  {`${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')} left`}
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e);
                  }
                }}
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
            <button className="btn btn-primary mt-3" onClick={handleMainMenuClick}>
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
      <div className="fixed top-5 right-5 z-10">
      </div>
    </motion.div>
  );
};

export default Game;