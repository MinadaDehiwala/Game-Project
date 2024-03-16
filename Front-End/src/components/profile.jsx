// profile.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch('http://localhost:3000/profile', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        console.error('Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/profile', {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        window.location.href = '/';
      } else {
        console.error('Failed to delete profile');
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const toggleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="login template d-flex justify-content-center align-items-center"
      style={{ width: '100%', display: 'flex', justifyContent: 'center', marginLeft: '52vh' }}
    >
      <Container fluid>
        <Card className="m-5" style={{ width: '100%', maxWidth: '600px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px', padding: '20px' }}>
          <Card.Body>
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
                  <label className="form-label" style={{ fontSize: '1.5rem' }}>Score:</label>
                  <span className="profile-value" style={{ fontSize: '1.5rem' }}>{profileData.score}</span>
                </div>
              </>
            )}
            <div className="text-center">
              <Button variant="primary" className="mt-3" onClick={() => window.location.href = "/menu"} style={{ fontSize: '1.8rem' }}>
                Main Menu
              </Button>
              <Button variant="danger" className="mt-3 ms-3" onClick={toggleConfirmationModal} style={{ fontSize: '1.8rem' }}>
                Delete Profile
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showConfirmationModal} onHide={toggleConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Profile Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your profile?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleConfirmationModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProfile}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
};

export default Profile;