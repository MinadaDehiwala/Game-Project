import React from 'react';
import { motion } from 'framer-motion';
import { MDBContainer, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import { FaGamepad, FaQuestionCircle, FaHourglassHalf, FaPencilAlt, FaTrophy, FaUndo } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// HowToPlay component
const HowToPlay = () => {
  // Function to handle icon click and display a SweetAlert2 modal with the corresponding text
  const handleIconClick = (icon, text) => {
    Swal.fire({
      title: icon,
      text: text,
      icon: 'question',
    });
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
            {/* Section title */}
            <h1 className="text-center mb-4" style={{ color: '#007bff', fontFamily: 'Arial, sans-serif' }}>
              <FaQuestionCircle style={{ marginRight: '10px' }} /> How to Play
            </h1>
            {/* Instructions text */}
            <p className="text-center text " style={{ marginTop: '20px' }}>
              Click on any icon to learn more.
            </p>
            {/* Container for icons */}
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
              {/* Icon 1: 10 Levels */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleIconClick('10 Levels?', 'The game consists of 10 levels, each with an image-based puzzle. You need to get the answer correct to continue to next level.')}
                style={{ width: '200px', margin: '20px', textAlign: 'center', cursor: 'pointer' }}
              >
                <FaGamepad size={64} color="#007bff" />
                <p style={{ marginTop: '10px' }}>10 Levels of Fun</p>
              </motion.div>
              {/* Icon 2: Time Limit */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleIconClick('Time Limit?', "Each level has a time limit, which decreases as the levels progress.")}
                style={{ width: '200px', margin: '20px', textAlign: 'center', cursor: 'pointer' }}
              >
                <FaHourglassHalf size={64} color="#007bff" />
                <p style={{ marginTop: '10px' }}>Race Against Time!</p>
              </motion.div>
              {/* Icon 3: Solve Puzzles */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleIconClick('Solve Puzzles?', "Solve the puzzle by replacing the tomato with a number between 0 and 9.")}
                style={{ width: '200px', margin: '20px', textAlign: 'center', cursor: 'pointer' }}
              >
                <FaPencilAlt size={64} color="#007bff" />
                <p style={{ marginTop: '10px' }}>Solve the Math Puzzle</p>
              </motion.div>
              {/* Icon 4: Score Points */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleIconClick('Score Points?', "If your answer is correct, you'll proceed to the next level and earn points. Points are also calculated on how fast you solve the puzzle.")}
                style={{ width: '200px', margin: '20px', textAlign: 'center', cursor: 'pointer' }}
              >
                <FaTrophy size={64} color="#007bff" />
                <p style={{ marginTop: '10px' }}>Score Points depending on the time</p>
              </motion.div>
              {/* Icon 5: Restart */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleIconClick('Restart?', "If your answer is incorrect or the time runs out, you'll have to restart from level 1.")}
                style={{ width: '200px', margin: '20px', textAlign: 'center', cursor: 'pointer' }}
              >
                <FaUndo size={64} color="#007bff" />
                <p style={{ marginTop: '10px' }}>Restart from level 1 if Wrong</p>
              </motion.div>
            </div>

            {/* Back to Main Menu button */}
            <div className="text-center">
              <Link to="/menu" style={{ textDecoration: 'none' }}>
                <Button variant="primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>
                  Back to Main Menu
                </Button>
              </Link>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </motion.div>
  );
};

export default HowToPlay;