  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
  import { MDBContainer, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
  import { motion } from 'framer-motion';
  import axios from 'axios';
  import Swal from 'sweetalert2'; // Import SweetAlert2
  

  function Login() {
    const [values, setValues] = useState({ email: '', password: '' });

    const handleChange = (event) => {
      const { name, value } = event.target;
      setValues(prevValues => ({
        ...prevValues,
        [name]: value
      }));
    };

    const handleLogin = () => {
      axios.post('http://localhost:3000/login', values)
        .then(res => {
          console.log('Login response:', res.data);
          const { success, token, message } = res.data;
          if (success && token) {
            // Save the token to local storage or session storage
            localStorage.setItem('token', token); // Save token to local storage
            // Show success popup
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Login Successful",
              showConfirmButton: false,
              timer: 1500
            });
            // Redirect the user to the main menu or desired route
            // Replace the following line with your own logic for redirection
            window.location.href = '/menu'; // Redirect to main menu
          } else {
            // Handle error if login is not successful
            console.error('Login failed:', message || 'Unknown error');
            alert('Login failed. Please check your credentials and try again.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while logging in: ' + error.message);
        });
    };
    

    return (
      <MDBContainer fluid className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '-40vh' }} 
        >
          <MDBCard className='m-5' style={{ width: '100%', maxWidth: '600px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px', padding: '20px' }}>
            <MDBCardBody className='px-5'>
              <h2 className="font-bold text-center" style={{ fontSize: '2.875rem', marginBottom: '2.25rem' }}>Login</h2>
              <div className="mb-4">
                <label htmlFor="email" className="form-label" style={{ fontSize: '1.5rem' }}>Your Email</label>
                <MDBInput wrapperClass='mb-4' size='lg' id='form1' type='email' name='email' value={values.email} onChange={handleChange} placeholder="Enter your email"/>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label" style={{ fontSize: '1.5rem' }}>Password</label>
                <MDBInput wrapperClass='mb-4' size='lg' id='form2' type='password' name='password' value={values.password} onChange={handleChange} placeholder="Enter your password"/>
              </div>
              <div className='d-flex justify-content-between align-items-center mb-4'>
                <button type="button" className="btn btn-success w-100" onClick={handleLogin}>Login</button>
              </div>
              <p className="text-center mb-0" style={{ fontSize: '1.125rem' }}>Don't have an account? <Link to="/signup" style={{ fontWeight: 'bold', color: '#000' }}>Sign Up</Link></p>
            </MDBCardBody>
          </MDBCard>
        </motion.div>
      </MDBContainer>
    );
  }

  export default Login;
