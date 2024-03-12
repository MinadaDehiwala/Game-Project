import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBSpinner } from 'mdb-react-ui-kit';
import { Dropdown } from 'react-bootstrap';
import axios from "axios";

const Game = () => {
  const [level, setLevel] = useState(1);
  const [timer, setTimer] = useState(180); // Default timer set to 3 minutes
  const [imageURL, setImageURL] = useState("");
  const [solution, setSolution] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true); // State to track image loading status

  useEffect(() => {
    fetchQuestion();
  }, [level]);

  const fetchQuestion = () => {
    axios.get("https://marcconrad.com/uob/tomato/api.php")
      .then(response => {
        const { question, solution } = response.data;
        setImageURL(question);
        setSolution(solution);
        resetTimer();
      })
      .catch(error => console.error("Error fetching question:", error));
  };

  const resetTimer = () => {
    // Adjust timer based on the level
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
        if (prevTimer === 0) {
          clearInterval(countdown);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [level]);

  useEffect(() => {
    if (timer === 0) {
      setMessage("Time's up! Try again.");
      setTimeout(() => {
        setMessage("");
        setLevel(1);
      }, 2000);
    }
  }, [timer]);

  useEffect(() => {
    // Set loading to false when the image is loaded
    const image = new Image();
    image.src = imageURL;
    image.onload = () => setLoading(false);
    image.onerror = () => setLoading(false);
  }, [imageURL]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stringAnswer = answer.toString();
    const stringSolution = solution.toString();
    if (stringAnswer === stringSolution) {
      setMessage("Correct! Proceeding to next level.");
      setTimeout(() => {
        setMessage("");
        setLevel(prevLevel => prevLevel + 1);
        setScore(prevScore => prevScore + 1);
      }, 2000);
    } else {
      setMessage("Incorrect! Try again.");
      setTimeout(() => {
        setMessage("");
        setLevel(1);
      }, 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="game-container"
      style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '-5vh' }} // Adjust margin-top to move content up

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
              <MDBInput wrapperClass='mb-4' size='lg' id='answer' type='text' value={answer} onChange={(e) => setAnswer(e.target.value)} style={{ marginLeft: '10px', marginRight: '10px', }} />
              <button type="submit" className="btn btn-success bg-green-500 w-40" style={{ marginLeft: '25px', marginBottom: '20px' }} onClick={handleSubmit}>Submit</button>
            </div>

            {message && <div className="message">{message}</div>}
            <Dropdown style={{ float: 'right', marginTop: '20px' }}>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Select Level
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {[...Array(10)].map((_, index) => (
                  <Dropdown.Item key={index + 1} onClick={() => setLevel(index + 1)}>Level {index + 1}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
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
    </motion.div>
  );
};

export default Game;
