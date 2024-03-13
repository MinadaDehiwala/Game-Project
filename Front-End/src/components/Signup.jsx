import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { motion } from 'framer-motion';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignup = () => {
    // Send signup data to the backend server
    axios.post('/signup', formData)
      .then(response => {
        console.log(response.data);
        // Handle success or show a message to the user
      })
      .catch(error => {
        console.error('Error signing up:', error);
        // Handle error or show a message to the user
      });
  };

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh', paddingTop: '100px', paddingRight: '30px' }}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '-40vh' }}
      >
        <MDBCard className='m-5' style={{ width: '100%', maxWidth: '600px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px', padding: '20px' }}>
          <MDBCardBody className='px-5'>
            <h2 className="text-uppercase text-center mb-5">Create an account</h2>
            <div className="mb-4">
              <label htmlFor="form1" className="form-label" style={{ fontSize: '1.5rem' }}>Your Name</label>
              <MDBInput wrapperClass='mb-4' size='lg' id='form1' type='text' placeholder="Your Name" onChange={(e) => setFormData({ ...formData, username: e.target.value })}/>
            </div>
            <div className="mb-4">
              <label htmlFor="form2" className="form-label" style={{ fontSize: '1.5rem' }}>Your Email</label>
              <MDBInput wrapperClass='mb-4' size='lg' id='form2' type='email' placeholder="Your Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
            </div>
            <div className="mb-4">
              <label htmlFor="form3" className="form-label" style={{ fontSize: '1.5rem' }}>Password</label>
              <MDBInput wrapperClass='mb-4' size='lg' id='form3' type='password' placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
            </div>
            <div className="mb-4">
              <label htmlFor="form4" className="form-label" style={{ fontSize: '1.5rem' }}>Repeat your password</label>
              <MDBInput wrapperClass='mb-4' size='lg' id='form4' type='password' placeholder="Repeat your password" onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}/>
            </div>
    
            <button type="button" className="btn btn-success w-100" onClick={handleSignup}>Sign Up</button>
            <p className="text-center mt-3 mb-0">Already have an account? <Link to="/">Login</Link></p>
          </MDBCardBody>
        </MDBCard>
      </motion.div>
    </MDBContainer>
  );
}

export default Signup;
