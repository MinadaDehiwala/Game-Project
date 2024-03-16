import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuthCheck = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsLoading(false);
      return;
    }

    axios
      .get('/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUserData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      });
  }, []);

  return { isLoading, userData };
};

export default useAuthCheck;
