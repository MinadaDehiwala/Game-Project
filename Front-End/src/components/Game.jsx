  import React, { useState, useEffect, useRef } from "react";
  import { motion } from "framer-motion";
  import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBSpinner, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdb-react-ui-kit';
  import { Dropdown } from 'react-bootstrap';
  import axios from "axios";
  import ReactConfetti from 'react-confetti';

  const Game = () => {
    const [level, setLevel] = useState(1);
    const [timer, setTimer] = useState(180);
    const [imageURL, setImageURL] = useState("");
    const [solution, setSolution] = useState("");
    const [answer, setAnswer] = useState("");
    const [message, setMessage] = useState("");
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);
    const countdownRef = useRef(null);

    useEffect(() => {
      fetchQuestion();
    }, [level]);
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    
    const fetchQuestion = () => {
      setLoading(true); // Set loading to true before fetching the question
      axios.get("https://marcconrad.com/uob/tomato/api.php")
        .then(response => {
          const { question, solution } = response.data;
          setImageURL(question);
          setSolution(solution);
          resetTimer();
          setLoading(false); // Set loading to false after fetching the question
        })
        .catch(error => {
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
        setTimer(prevTimer => {
          if (prevTimer === 0 || gameCompleted) {
            clearInterval(countdown); // Stop the timer if it reaches 0 or game is completed
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
        if (level === 10) {
          setShowConfetti(true); // Show confetti upon completing level 10
          setShowPopup(true); // Display popup upon completing level 10
          setGameCompleted(true); // Set game completion flag
        } else {
          setMessage("Correct! Proceeding to next level.");
          setTimeout(() => {
            setMessage("");
            setLevel(prevLevel => prevLevel + 1);
            setScore(prevScore => prevScore + 1);
          }, 2000);
        }
      } else {
        setMessage("Incorrect! Try again.");
        setTimeout(() => {
          setMessage("");
          setLevel(1);
        }, 2000);
      }
    };

  // Other parts of your component...
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="game-container"
      style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '-5vh' }}
    >
      <MDBContainer fluid className='d-flex align-items-start justify-content-center p-6' style={{ paddingTop: '0vh' }}>
        <MDBCard className='m-5' style={{ width: '80%', maxWidth: '800px', backgroundColor: 'white', borderRadius: '15px', padding: '20px', visibility: loading ? 'hidden' : 'visible' }}>
          <MDBCardBody className='px-5'>
            <h1 className="level text-center">Level {level}</h1>
            <div className="timer" style={{ fontSize: '2rem', textAlign: 'right' }}>{formatTime(timer)} left</div>
            <h2 className="score">Score: {score}</h2>
            <img src={imageURL} alt="Question" className="question-image" style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }} />
            <div className="mb-4 d-flex align-items-center justify-content-center">
              <label htmlFor="answer" className="form-label" style={{ fontSize: '1.5rem', marginBottom: '25px' }}>Answer:</label>
              <MDBInput wrapperClass='mb-4' size='lg' id='answer' type='text' value={answer} onChange={(e) => setAnswer(e.target.value)} style={{ marginLeft: '10px', marginRight: '10px' }} />
              <button type="submit" className="btn btn-success bg-green-500 w-40" style={{ marginLeft: '25px', marginBottom: '20px' }} onClick={handleSubmit}>Submit</button>
            </div>

            {message && <div className="message">{message}</div>}
            <MDBModal show={showPopup} onHide={() => setShowPopup(false)}>
              <MDBModalHeader>Congratulations!</MDBModalHeader>
              <MDBModalBody>
                <p>You have completed the game.</p>
                <p>Your final score is {score}.</p>
              </MDBModalBody>
              <MDBModalFooter>
                <button className="btn btn-primary" onClick={() => window.location.href = "/menu"}>Main Menu</button>
              </MDBModalFooter>
            </MDBModal>
            <select className="form-select mt-3" onChange={(e) => setLevel(Number(e.target.value))} value={level} style={{ width: '50%' }}>
              {[...Array(10)].map((_, index) => (
                <option key={index + 1} value={index + 1}>Level {index + 1}</option>
              ))}
            </select>
            <button className="btn btn-primary mt-3" onClick={() => window.location.href = "/menu"}>Main Menu</button>
          </MDBCardBody>
        </MDBCard>
        {loading && (
          <div className="text-center">
            <MDBSpinner role='status'>
              <span className='visually-hidden'>Loading...</span>
            </MDBSpinner>
          </div>
        )}
      </MDBContainer>

      <ReactConfetti
        numberOfPieces={showConfetti ? 1000 : 0}
        recycle={false}
      />
    </motion.div>
  );
};

export default Game;
