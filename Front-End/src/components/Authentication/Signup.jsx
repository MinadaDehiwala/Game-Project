import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { motion } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:3000/signup', formData);
      Swal.fire({
        icon: 'success',
        title: 'Signup Successful',
        text: 'Your account has been created. You will be redirected to the login page.',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
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
              <label htmlFor="username" className="form-label" style={{ fontSize: '1.5rem' }}>Your Name</label>
              <MDBInput wrapperClass='mb-4' size='lg' id='name' type='text' placeholder="Enter Your Name" name="name" value={formData.name} onChange={handleChange}/>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form-label" style={{ fontSize: '1.5rem' }}>Your Email</label>
              <MDBInput wrapperClass='mb-4' size='lg' id='email' type='email' placeholder="Your Email" name="email" value={formData.email} onChange={handleChange}/>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label" style={{ fontSize: '1.5rem' }}>Password</label>
              <MDBInput wrapperClass='mb-4' size='lg' id='password' type='password' placeholder="Password" name="password" value={formData.password} onChange={handleChange}/>
            </div>
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
      if (e.key === 'Enter') {
        handleSignup();
      }
    }}
  />
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
