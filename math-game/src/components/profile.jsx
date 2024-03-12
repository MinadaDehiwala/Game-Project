import React from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { motion } from 'framer-motion';

const Profile = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="login template d-flex justify-content-center align-items-center"
      style={{ width: '100%', display: 'flex', justifyContent: 'center', marginLeft: '52vh' }} // Adjust margin-top to move content up
    >
      <MDBContainer fluid>
        <MDBCard className="m-5" style={{ width: '100%', maxWidth: '600px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px', padding: '20px' }}>
          <MDBCardBody>
            <h2 className="text-center mb-4" style={{ fontSize: '2.5rem' }}>Profile</h2> {/* Increase text size */}
            <div className="mb-4">
              <label htmlFor="name" className="form-label" style={{ fontSize: '1.5rem' }}>Name:</label> {/* Increase text size */}
              <span className="profile-value" style={{ fontSize: '1.5rem' }}></span> {/* Increase text size */}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form-label" style={{ fontSize: '1.5em' }}>Email:</label> {/* Increase text size */}
              <span className="profile-value" style={{ fontSize: '1.25rem' }}></span> {/* Increase text size */}
            </div>
            <div className="mb-4">
              <label className="form-label" style={{ fontSize: '1.5rem' }}>Score:</label> {/* Increase text size */}
              <span className="profile-value" style={{ fontSize: '1.5rem' }}>0</span> {/* Increase text size */}
            </div>
            <div className="text-center"> {/* Center the button */}
              <button className="btn btn-primary mt-3" onClick={() => window.location.href = "/menu"} style={{ fontSize: '1.8rem' }}>Main Menu</button>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </motion.div>
  );
};

export default Profile;
