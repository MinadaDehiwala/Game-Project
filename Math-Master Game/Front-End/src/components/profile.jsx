import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, makeStyles } from '@material-ui/core';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// Define custom styles using Material-UI's makeStyles hook
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100vh',
    paddingTop: '50px',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '15px',
    padding: '20px',
    maxWidth: '500px',
    width: '100%',
    height: '450px',
    justifyContent: 'center'
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
    fontWeight: 'bold',
    marginLeft: '8px',
  },
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    fontSize: '1.2rem',
  },
}));


const Profile = () => {
  // Get the custom styles
  const classes = useStyles();
  // State to store the user's profile data
  const [profileData, setProfileData] = useState(null);

  // Fetch the user's profile data when the component mounts
  useEffect(() => {
    fetchProfileData();
  }, []);

  // Function to fetch the user's profile data from the server
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

  // Function to handle profile deletion
  const handleDeleteProfile = async () => {
    Swal.fire({
      title: 'Confirm Profile Deletion',
      text: 'Are you sure you want to delete your profile?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch('http://localhost:3000/profile', {
            method: 'DELETE',
            credentials: 'include',
          });
          if (response.ok) {
            // Show a success message and redirect to the login page
            Swal.fire({
              title: 'Profile Deleted',
              text: 'Your profile has been successfully deleted. You will be redirected to the login page in 5 seconds.',
              icon: 'success',
              timer: 5000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
              },
            }).then(() => {
              window.location.href = '/';
            });
          } else {
            console.error('Failed to delete profile');
          }
        } catch (error) {
          console.error('Error deleting profile:', error);
        }
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={classes.root}
    >
      <Card className={classes.card}>
        <CardContent>
          <h2 className={classes.title}>Profile</h2>
          {/* Render the user's profile data if available */}
          {profileData && (
            <>
              <div className="mb-4">
                <label htmlFor="name" className={classes.label}>
                  Name :
                </label>
                <span className={classes.value}>{profileData.name}</span>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className={classes.label}>
                  Email :
                </label>
                <span className={classes.value}>{profileData.email}</span>
              </div>
              <div className="mb-4">
                <label className={classes.label}>Score :</label>
                <span className={classes.value}>{profileData.score}</span>
              </div>
            </>
          )}
          <div className="text-center">
            {/* Link to the main menu */}
            <Link to="/menu" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" className={classes.button}>
                Main Menu
              </Button>
            </Link>
            {/* Button to delete the user's profile */}
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={handleDeleteProfile}
            >
              Delete Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Profile;