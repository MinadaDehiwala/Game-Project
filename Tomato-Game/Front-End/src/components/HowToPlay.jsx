import React from 'react';
import { motion } from 'framer-motion';
import { MDBContainer, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';


 

const HowToPlay = () => {
  const navigate = useNavigate();
  const handleMainMenuClick = () => {
    navigate('/menu');
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="how-to-play-container"
      style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '-5vh' }}
    >
      <MDBContainer fluid className="d-flex align-items-start justify-content-center p-6" style={{ paddingTop: '0vh' }}>
        <MDBCard className="m-5" style={{ width: '80%', maxWidth: '800px', backgroundColor: 'white', borderRadius: '15px', padding: '20px' }}>
          <MDBCardBody className="px-5">
            <h1 className="text-center mb-4">How to Play</h1>
            <ol>
              <li>
                <p>The game consists of 10 levels, each with an image-based question.</p>
              </li>
              <li>
                <p>Each level has a time limit, which decreases as the levels progress. The time limit is shown in the top-right corner.</p>
              </li>
              <li>
                <p>The objective is to correctly identify and enter the solution for each question before the time runs out.</p>
              </li>
              <li>
                <p>Type your answer in the input field and click the "Submit" button to submit your answer.</p>
              </li>
              <li>
                <p>If your answer is correct, you'll proceed to the next level and earn points. If your answer is incorrect, you'll have to restart from level 1.</p>
              </li>
              <li>
                <p>If the time runs out before you submit an answer, you'll have to restart from level 1.</p>
              </li>
              <li>
                <p>You can use the "Select Level" dropdown to jump to a specific level.</p>
              </li>
              <li>
                <p>Your current score is displayed at the top of the game screen.</p>
              </li>
              <li>
                <p>To return to the main menu, click the "Main Menu" button at the bottom of the game screen.</p>
              </li>
            </ol>
            <button className="btn btn-primary mt-3" onClick={handleMainMenuClick}>
        Main Menu
      </button>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </motion.div>
  );
};

export default HowToPlay;