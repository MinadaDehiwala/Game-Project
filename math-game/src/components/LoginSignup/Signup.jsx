import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';


function Signup() {
  return (
    
    <div className='signup template d-flex justify-content-center align-items-center vh-100'>
      
      <div className="form_container p-5 rounded bg-white">
        <form>
          <h2 className="text-center">Sign-Up</h2>

          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="email"
              placeholder="Enter Your Name" 
              className="form-control"
            />
            </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email" 
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-primary">Sign In</button>  
          </div>
          <p className="text-end mt-2">
            Already have an Account? <Link to="/" className="mt-2">Sign-In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
