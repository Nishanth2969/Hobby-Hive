import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';
import { removeToken } from '../utils/auth';

function Home({ setIsAuth }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axiosInstance.get('/api/auth/home/');
        setUserData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      }
    };

    verifyAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/api/auth/logout/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      removeToken();
      setIsAuth(false);
      navigate('/login');
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <p>{userData.message}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;