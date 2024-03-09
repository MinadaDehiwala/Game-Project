import React from "react";
import { motion } from "framer-motion";
import "./profile.css"; // Make sure to adjust the CSS in Profile.css

const Profile = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="login template d-flex justify-content-center align-items-center" // Apply the same container class as other pages
    >
      <div className="form_container p-5 rounded"> {/* Apply the same style as other pages */}
        <div className="profile-box">
          <h1 className="profile-title">Profile</h1>
          <div className="profile-details">
            <div className="profile-detail">
              <label htmlFor="name" className="profile-label text-white">Name:</label>
              <span className="profile-value"></span>
            </div>
            <div className="profile-detail">
              <label htmlFor="email" className="profile-label text-white">Email:</label>
              <span className="profile-value"></span>
            </div>
            <div className="profile-detail">
              <label className="profile-label text-white ">Score:</label>
              <span className="profile-value text-white"> 0</span>
            </div>
          </div>
          <button className="main-menu-button" onClick={() => window.location.href="/menu"}>Main Menu</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
