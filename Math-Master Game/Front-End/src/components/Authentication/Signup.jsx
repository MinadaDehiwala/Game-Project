import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { motion } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';

function Signup() {
  // State for storing form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  // Get the navigation function from React Router
  const navigate = useNavigate();

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle signup
  const handleSignup = async () => {
    const { name, email, password, confirmPassword } = formData;

    // Form validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !password || !confirmPassword) {
      // Show an error if any required field is missing
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'Please fill in all required fields.',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!emailRegex.test(email)) {
      // Show an error if the email is invalid
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (password !== confirmPassword) {
      // Show an error if the passwords do not match
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match.',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      // Send a POST request to the server for signup
      const res = await axios.post('http://localhost:3000/signup', formData);
      // Show a success message and redirect to the login page
      Swal.fire({
        icon: 'success',
        title: 'Signup Successful',
        text: 'Your account has been created. You will be redirected to the login page in 3 seconds.',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      // Log any errors and show an error message
      console.error('Error signing up:', error);
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: 'There was an error creating your account. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh', paddingTop: '100px', paddingRight: '30px' }}>
      {/* Signup card */}
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
            {/* Name input */}
            <div className="mb-4">
              <label htmlFor="username" className="form-label" style={{ fontSize: '1.5rem' }}>Your Name</label>
              <MDBInput wrapperClass='mb-4' size='lg' id='name' type='text' placeholder="Enter Your Name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            {/* Email input */}
            <div className="mb-4">
              <label htmlFor="email" className="form-label" style={{ fontSize: '1.5rem' }}>Your Email</label>
              <MDBInput wrapperClass='mb-4' size='lg' id='email' type='email' placeholder="Your Email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            {/* Password input */}
            <div className="mb-4">
              <label htmlFor="password" className="form-label" style={{ fontSize: '1.5rem' }}>Password</label>
              <MDBInput wrapperClass='mb-4' size='lg' id='password' type='password' placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            {/* Confirm password input */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label" style={{ fontSize: '1.5rem' }}>Confirm Password</label>
              <MDBInput
                wrapperClass='mb-4'
                size='lg'
                id='confirmPassword'
                type='password'
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onKeyDown={(e) => {
                  // Handle signup when the Enter key is pressed
                  if (e.key === 'Enter') {
                    handleSignup();
                  }
                }}
              />
            </div>

            {/* Signup button */}
            <button type="button" className="btn btn-success w-100" onClick={handleSignup}>Sign Up</button>
            {/* Link to login */}
            <p className="text-center mt-3 mb-0">Already have an account? <Link to="/">Login</Link></p>
          </MDBCardBody>
        </MDBCard>
      </motion.div>
    </MDBContainer>
  );
}

export default Signup;