import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Button, Modal, makeStyles } from '@material-ui/core';
import { motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
    marginLeft: '52vh',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '15px',
    padding: '20px',
    maxWidth: '600px',
    width: '100%',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2.25rem',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    fontSize: '1.5rem',
    marginBottom: theme.spacing(1),
  },
  value: {
    fontSize: '1.5rem',
  },
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    fontSize: '1.2rem',
  },
}));

const Profile = () => {
  const classes = useStyles();
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
      className={classes.root}
    >
      <Container fluid>
        <Card className={classes.card}>
          <CardContent>
            <h2 className={classes.title}>Profile</h2>
            {profileData && (
              <>
                <div className="mb-4">
                  <label htmlFor="name" className={classes.label}>Name:  </label>
                  <span className={classes.value}>{    profileData.name}</span>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className={classes.label}>Email:  </label>
                  <span className={classes.value}>{profileData.email}</span>
                </div>
                <div className="mb-4">
                  <label className={classes.label}>Score:  </label>
                  <span className={classes.value}>{profileData.score}</span>
                </div>
              </>
            )}
            <div className="text-center">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => window.location.href = "/menu"}
              >
                Main Menu
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={toggleConfirmationModal}
              >
                Delete Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>

      <Modal open={showConfirmationModal} onClose={toggleConfirmationModal}>
        <Container maxWidth="sm">
          <Card>
            <CardContent>
              <h2 className={classes.title}>Confirm Profile Deletion</h2>
              <p>Are you sure you want to delete your profile?</p>
              <div className="text-center">
                <Button
                  variant="contained"
                  color="default"
                  className={classes.button}
                  onClick={toggleConfirmationModal}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={handleDeleteProfile}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Modal>
    </motion.div>
  );
};

export default Profile;