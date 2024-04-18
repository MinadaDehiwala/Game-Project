import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; // Used for animations
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSpinner,
  MDBSwitch
} from "mdb-react-ui-kit"; // UI components from MDB React UI Kit
import axios from "axios"; // Used for making HTTP requests
import ReactConfetti from "react-confetti"; // Used for confetti effect
import Swal from "sweetalert2"; // Used for displaying alerts and modals
import YouTube from "react-youtube"; // Used for embedding YouTube video
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Game = () => {
  // State variables
  const [level, setLevel] = useState(1); // Current level
  const [timer, setTimer] = useState(180); // Timer in seconds
  const [imageURL, setImageURL] = useState(""); // URL of the question image
  const [solution, setSolution] = useState(""); // Solution for the current question
  const [answer, setAnswer] = useState(""); // User's answer
  const [message, setMessage] = useState(""); // Message to display
  const [score, setScore] = useState(0); // User's score
  const [loading, setLoading] = useState(true); // Loading state
  const [showConfetti, setShowConfetti] = useState(false); // Show confetti effect
  const [gameCompleted, setGameCompleted] = useState(false); // Game completed state
  const [isMuted, setIsMuted] = useState(false); // Mute state for background music
  const countdownRef = useRef(null); // Reference for the timer interval
  const playerRef = useRef(null); // Reference for the YouTube player

// Function to fetch a random fact about a number
  const getNumberFact = async (number) => {
    try {
      const response = await axios.get(`http://numbersapi.com/${number}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching number fact:', error);
      return 'Failed to fetch number fact.';
    }
  };

  // Function to update the highest score in the backend
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
          console.log(score, currentScore);
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

  // Function to calculate the score based on remaining time and current level
  const calculateScore = () => {
    const timeRemaining = timer;
    const maxScore = 100; // Maximum score per level
    const minScore = 0; // Minimum score per level

    // Calculate the score based on the remaining time
    const score = Math.round(
      (timeRemaining / (180 - level * 10)) * maxScore + minScore
    );

    return score;
  };

  // Function to handle level completion
  const handleLevelComplete = async () => {
    try {
      setShowConfetti(true); // Show confetti effect
      setTimeout(() => setShowConfetti(false), 5000); // Show confetti for 5 seconds
  
      if (level === 10) { // Check if the game is completed
        const result = await Swal.fire({
          title: level === 10 ? "Congratulations!" : "Level Complete!",
          text: level === 10 ? "You have completed the game!" : "Proceed to the next level?",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: level === 10 ? "Main Menu" : "Next Level",
          allowOutsideClick: false,
        });
  
        if (result.isConfirmed) {
          window.location.href = "/menu"; // Redirect to the main menu
        }
        setGameCompleted(true);
        await updateHighestScore(calculateScore()); // Update the highest score
      } else {
        const numberFact = await getNumberFact(level + 1);
        const result = await Swal.fire({ // Display a modal with the fact and a message
          title: "Level Complete!",
          text: ` Did you know? ${numberFact}\n\nProceed to the next level?`, // Display a random fact about the next level
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Next Level",
        });
  
        if (result.isConfirmed) {
          setLevel(level + 1); // Increase the level by 1
          const newScore = score + calculateScore(); // Calculate the new score
          setScore(newScore); // Update the score
          await updateHighestScore(newScore);// Update the highest score
        }
      }
    } catch (error) {
      console.error("Error displaying SweetAlert2:", error);
    }
  };


  // Fetch a new question when the level changes
  useEffect(() => {
    fetchQuestion();
  }, [level]);

  // Function to format time in MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Function to fetch a new question from the API
  const fetchQuestion = () => {
    setLoading(true); // Set loading state to true
    axios
      .get("https://marcconrad.com/uob/tomato/api.php") // API endpoint to fetch question
      .then((response) => {
        const { question, solution } = response.data;
        setImageURL(question);
        setSolution(solution);
        resetTimer(); // Reset the timer
        setLoading(false); // Set loading state to false
        console.log(solution);
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
        setMessage("Failed to fetch the question. Please try again later.");
        setLoading(false); // Set loading state to false
      });
      
  };

  // Function to reset the timer based on the current level
  const resetTimer = () => {
    if (level === 10) {
      setTimer(20); // Set the timer to 20 seconds for level 10
    } else {
      setTimer(180 - (level - 1) * 20); // Decrease the timer by 20 seconds for each level
    }
  };

  // Set up the timer and handle its expiration
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

  // Function to handle form submission and check the user's answer
  const handleSubmit = (e) => {
    e.preventDefault();
    const stringAnswer = answer.toString();
    const stringSolution = solution.toString();
    if (stringAnswer === stringSolution) {
      clearInterval(countdownRef.current); // Stop the timer when the answer is correct
      handleLevelComplete(); // Handle level completion
    } else {
      handleWrongAnswer(); // Handle wrong answer
    }
    setAnswer('');
  };

  // Function to handle timeout (when the timer runs out)
  const handleTimeOut = async () => {
    try {
      const result = await Swal.fire({
        title: "Time's Up!",
        text: "You ran out of time. Try again from Level 1.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Try Again",
        allowOutsideClick: false, // Add this line to prevent dismissal by clicking outside
      });

      if (result.isConfirmed) {
        setLevel(1);
        setScore(0);

      }
    } catch (error) {
      console.error("Error displaying SweetAlert2:", error);
    }
  };

  // Function to handle wrong answer
  const handleWrongAnswer = async () => {
    try {
      const numberFact = await getNumberFact(level); // Fetch a random fact about the current level
      const result = await Swal.fire({ // Display a modal with the fact and a message
        title: "Oops...",
        text: `Incorrect answer. Did you Know? ${numberFact}\n\nTry again from Level 1.`,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Try Again",
        allowOutsideClick: false,
      });
  
      // Reset the level, score, and fetch a new question
      if (result.isConfirmed) {
        setLevel(1);
        await updateHighestScore();
        setScore(0);
        fetchQuestion();
      }
    } catch (error) {
      console.error("Error displaying SweetAlert2:", error);
    }
  };

  // Function to toggle mute/unmute for background music
  const toggleMute = () => {
    setIsMuted((prevIsMuted) => {
      if (playerRef.current && playerRef.current.internalPlayer) {
        playerRef.current.internalPlayer.mute(!prevIsMuted);
      }
      return !prevIsMuted;
    });
  };

  // Function to handle YouTube player ready event
  const handleYouTubeReady = (event) => {
    event.target.playVideo(); // Play the video
    if (isMuted && event.target.internalPlayer) {
      event.target.internalPlayer.mute(); // Mute the video if isMuted is true
    }
    playerRef.current = event.target; // Store the player reference
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
      {/* Container for the game */}
      <MDBContainer
        fluid
        className="d-flex align-items-start justify-content-center p-6"
        style={{ paddingTop: "0vh" }}
      >
        {/* Card containing the game elements */}
        <MDBCard
          className="m-5"
          style={{
            width: "80%",
            maxWidth: "800px",
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "20px",
            visibility: loading ? "hidden" : "visible", // Hide the card if loading is true
          }}
        >
          <MDBCardBody className="px-5">
            {/* Display the current level and mute switch */}
            <div className="d-flex align-items-center mb-3">
              <h1 className="level text-center">Level {level}</h1>
              <div className="d-flex align-items-center ms-auto">
                <span className="me-3">Sound</span>
                <MDBSwitch
                  id="mute-switch"
                  checked={!isMuted}
                  onChange={toggleMute}
                />
              </div>
            </div>
            {/* Display the remaining time */}
            <div
              className="timer"
              style={{ fontSize: "2rem", textAlign: "right" }}
            >
              {formatTime(timer)} left
            </div>
            {/* Display the current score */}
            <h2 className="score">Score: {score}</h2>
            {/* Display the question image */}
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
            {/* Answer input and submit button */}
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
                  if (e.key === "Enter") {
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
            {/* Display any message */}
            {message && <div className="message">{message}</div>}
            {/* Level selector dropdown */}
            <select
              className="form-select mt-3"
              onChange={(e) => setLevel(Number(e.target.value))}
              value={level}
              style={{ width: "18%" }}
            >
              {[...Array(10)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  Level {index + 1}
                </option>
              ))}
            </select>
            {/* Buttons for help and main menu */}
            <div className="d-flex justify-content-center mt-3">
              <Link to="/howtoplay" className="me-2">
                <Button variant="warning">Help</Button>
              </Link>
              <Link to="/menu" className="btn btn-primary">
                Main Menu
              </Link>
            </div>
          </MDBCardBody>
        </MDBCard>
        {/* Show a loading spinner if loading is true */}
        {loading && (
          <div className="text-center">
            <MDBSpinner role="status">
              <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
          </div>
        )}
      </MDBContainer>
  
      {/* Show confetti effect if showConfetti is true */}
      {showConfetti && (
        <ReactConfetti numberOfPieces={1000} recycle={false} />
      )}
  
      {/* Background music */}
      <div className="youtube-player">
        <YouTube
          videoId="sAcj8me7wGI" // YouTube video ID
          opts={{
            height: "0",
            width: "0",
            playerVars: {
              autoplay: 1, // Autoplay the video
              mute: isMuted ? 1 : 0, // Mute the video if isMuted is true
            },
          }}
          onReady={handleYouTubeReady} // Handle player ready event
        />
      </div>
    </motion.div>
  );
};

export default Game;

