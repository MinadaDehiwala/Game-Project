  import React from 'react';
  import { useState, useEffect } from 'react';
  import { MDBContainer, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
  import { motion } from 'framer-motion';
  import axios from 'axios';


  const Profile = () => {
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
  
      // Make a request to the server to fetch user data
      axios.get('/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="login template d-flex justify-content-center align-items-center"
      style={{ width: '100%', display: 'flex', justifyContent: 'center', marginLeft: '52vh' }}
    >
      <MDBContainer fluid>
        <MDBCard className="m-5" style={{ width: '100%', maxWidth: '600px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px', padding: '20px' }}>
          <MDBCardBody>
            <h2 className="text-center mb-4" style={{ fontSize: '2.5rem' }}>Profile</h2>
            {profileData && (
              <>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label" style={{ fontSize: '1.5rem' }}>Name:</label>
                  <span className="profile-value" style={{ fontSize: '1.5rem' }}>{profileData.name}</span>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label" style={{ fontSize: '1.5em' }}>Email:</label>
                  <span className="profile-value" style={{ fontSize: '1.25rem' }}>{profileData.email}</span>
                </div>
                <div className="mb-4">
                  <label className="form-label" style={{ fontSize: '1.5rem' }}>Highest Score:</label>
                  <span className="profile-value" style={{ fontSize: '1.5rem' }}>{profileData.score}</span>
                </div>
              </>
            )}
            <div className="text-center">
              <button className="btn btn-primary mt-3" onClick={() => window.location.href = "/menu"} style={{ fontSize: '1.8rem' }}>Main Menu</button> 
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </motion.div>
  );

  };

  export default Profile;
