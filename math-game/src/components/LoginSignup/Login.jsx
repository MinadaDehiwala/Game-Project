// Login.jsx
import React from "react";
import { motion } from "framer-motion";
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <motion.div
      initial={{ opacity: 1, y: 2000 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }} // Adjust the duration as needed
      className='login template d-flex justify-content-center align-items-center'
    >
      <div className="form_container p-5 rounded ">
        <form>
          <h1 className="text-center mb-4">Login</h1>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter Email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">Password</label>
            <input type="password" className="form-control text-white" id="password" placeholder="Enter Password" />
          </div>
          <Link to="/menu" className="btn btn-primary d-block w-100 mb-3">Log-In</Link> {/* Link to the login page */}
          <p className="text-end text-white">
            No Account? <Link to="/signup" className="mt-2 text-white">Sign-Up</Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
}

export default Login;