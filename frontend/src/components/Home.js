import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'HobbyHive';
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/auth/logout/');
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to HobbyHive</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
