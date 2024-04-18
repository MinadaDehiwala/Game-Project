import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { motion } from 'framer-motion';
import axios from 'axios'; // Import axios for making HTTP requests
import { Modal, Button } from 'react-bootstrap';

function Login() {
  // State for storing email and password values
  const [values, setValues] = useState({ email: '', password: '' });
  // State for controlling the error modal visibility
  const [showErrorModal, setShowErrorModal] = useState(false);
  // State for storing the error message
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  // Get the navigation function from React Router
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async () => {
    try {
      // Make a POST request to the server for validating the password
      const res = await axios.post('http://localhost:3000/validatePassword', values, { withCredentials: true });
      if (res.data.validation) {
        // If the password is valid, navigate to the /menu route
        navigate('/menu');
      } else {
        // If the password is incorrect, show an error modal
        setErrorMessage('Incorrect Password!');
        setShowErrorModal(true);
      }
    } catch (error) {
      // If there is an error during the request, log it and show an error modal
      console.error('Error:', error);
      setErrorMessage('An error occurred while logging in.');
      setShowErrorModal(true);
    }
  };

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
      {/* Error modal */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '-40vh' }}
      >
        <MDBCard className='m-5' style={{ width: '100%', maxWidth: '600px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px', padding: '20px' }}>
          <MDBCardBody className='px-5'>
            <h2 className="font-bold text-center" style={{ fontSize: '2.875rem', marginBottom: '2.25rem' }}>Login</h2>
            {/* Email input */}
            <div className="mb-4">
              <label htmlFor="email" className="form-label" style={{ fontSize: '1.5rem' }}>Your Email</label>
              <MDBInput wrapperClass='mb-4' size='lg' id='form1' type='email' name='email' value={values.email} onChange={handleChange} placeholder="Enter your email" />
            </div>
            {/* Password input */}
            <div className="mb-4">
              <label htmlFor="password" className="form-label" style={{ fontSize: '1.5rem' }}>Password</label>
              <MDBInput
                wrapperClass='mb-4'
                size='lg'
                id='form2'
                type='password'
                name='password'
                value={values.password}
                onChange={handleChange}
                placeholder="Enter your password"
                onKeyDown={(e) => {
                  // Handle login when the Enter key is pressed
                  if (e.key === 'Enter') {
                    handleLogin();
                  }
                }}
              />
            </div>
            {/* Link to sign up */}
            <p className="text-center mb-0" style={{ fontSize: '1.125rem' }}>Don't have an account? <Link to="/signup" style={{ fontWeight: 'bold', color: '#000' }}>Sign Up</Link></p>

            {/* Login button */}
            <div className='d-flex justify-content-between align-items-center mb-4'>
              <button type="button" className="btn btn-success w-100" onClick={handleLogin}>Login</button>
            </div>
          </MDBCardBody>
        </MDBCard>
      </motion.div>
    </MDBContainer>
  );
}

export default Login;