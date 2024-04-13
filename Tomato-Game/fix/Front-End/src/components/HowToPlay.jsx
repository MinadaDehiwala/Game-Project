import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MDBContainer, MDBCard, MDBCardBody, MDBModal, MDBModalBody } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import { FaGamepad, FaHourglassHalf, FaPencilAlt, FaTrophy, FaUndo } from 'react-icons/fa';

const HowToPlay = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleIconClick = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent('');
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
        <MDBCard
          className="m-5"
          style={{
            width: '80%',
            maxWidth: '800px',
            backgroundColor: '#f8f9fa',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <MDBCardBody className="px-5">
            <h1 className="text-center mb-4" style={{ color: '#007bff', fontFamily: 'Arial, sans-serif' }}>
              <FaGamepad style={{ marginRight: '10px' }} /> How to Play
            </h1>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleIconClick('The game consists of 10 levels, each with an image-based puzzle.')}
                style={{ width: '200px', margin: '20px', textAlign: 'center', cursor: 'pointer' }}
              >
                <FaGamepad size={64} color="#007bff" />
                <p style={{ marginTop: '10px' }}>10 Levels of Fun</p>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleIconClick('Each level has a time limit, which decreases as the levels progress. The time limit is shown in the top-right corner.')}
                style={{ width: '200px', margin: '20px', textAlign: 'center', cursor: 'pointer' }}
              >
                <FaHourglassHalf size={64} color="#007bff" />
                <p style={{ marginTop: '10px' }}>Race Against Time! It decreases each level</p>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleIconClick('The objective is to correctly identify and enter the solution for each puzzle before the time runs out.')}
                style={{ width: '200px', margin: '20px', textAlign: 'center', cursor: 'pointer' }}
              >
                <FaPencilAlt size={64} color="#007bff" />
                <p style={{ marginTop: '10px' }}>Solve the Math Puzzle</p>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleIconClick("If your answer is correct, you'll proceed to the next level and earn points. If your answer is incorrect or the time runs out, you'll have to restart from level 1.")}
                style={{ width: '200px', margin: '20px', textAlign: 'center', cursor: 'pointer' }}
              >
                <FaTrophy size={64} color="#007bff" />
                <p style={{ marginTop: '10px' }}>Score Points depending on the time</p>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleIconClick('Your current score is displayed at the top of the game screen.')}
                style={{ width: '200px', margin: '20px', textAlign: 'center', cursor: 'pointer' }}
              >
                <FaUndo size={64} color="#007bff" />
                <p style={{ marginTop: '10px' }}>Restart from level 1 if Wrong</p>
              </motion.div>
            </div>
            <div className="text-center">
              <Button variant="primary" href="/menu" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>
                Back to Main Menu
              </Button>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>

      <MDBModal show={showModal} centered>
        <MDBModalBody>
          <p>{modalContent}</p>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </MDBModalBody>
      </MDBModal>
    </motion.div>
  );
};

export default HowToPlay;