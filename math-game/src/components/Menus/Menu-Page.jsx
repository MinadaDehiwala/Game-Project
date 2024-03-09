import React from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Menu() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 4000 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }} // Adjust the duration as needed
      className='login template d-flex justify-content-center align-items-center'
    >
      <div className="form_container p-5 rounded">
        <form>
          <h1 className="text-center mb-4">Welcome!</h1>
          <Link to="/profile" className="btn btn-primary d-block w-100 mb-3">My Profile</Link>
          <Link to="/game" className="btn btn-primary d-block w-100 mb-3">Play</Link>
          <Link to="/leaderboard" className="btn btn-primary d-block w-100 mb-3">Leaderboard</Link> 
          <Link to="/" className="btn btn-primary d-block w-100 mb-3">Exit/LogOut</Link>
        </form>
      </div>
    </motion.div>
  );
}

export default Menu;
