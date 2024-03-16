import React from "react";
import { motion } from "framer-motion";
import { Link,useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Menu() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1 }} // Adjust the duration as needed
      className='login template d-flex justify-content-center align-items-center'
    >
      <Container className="p-4 rounded" style={{ maxWidth: '500px', marginTop:'100px', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
        <Row className="justify-content-center align-items-center">
          <Col md="12">
            <h1 className="text-center mb-4 display-4">Welcome!</h1>
            <Link to="/profile"><Button variant="primary" className="w-100 mb-3 fs-3">My Profile</Button></Link>
            <Link to="/game"><Button variant="primary" className="w-100 mb-3 fs-3">Play</Button></Link>
            <Link to="/leaderboard"><Button variant="primary" className="w-100 mb-3 fs-3">Leaderboard</Button></Link>
            <Link to="/howtoplay">
              <Button variant="primary" className="w-100 mb-3 fs-3">
                How to play
              </Button>
            </Link>
            <Link to="/"><Button variant="primary" className="w-100 mb-3 fs-3">Exit/LogOut</Button></Link>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
      
        </Row>
      </Container>
    </motion.div>
  );
}

export default Menu;
