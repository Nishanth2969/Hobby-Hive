import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setconfirm_password] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'HobbyHive - Signup';
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirm_password) {
      alert('Passwords do not match!');
      return;
    }

    const payload = {
      username,
      email,
      password,
      confirm_password
    };
  
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register/', payload);

      if (response.status === 201) {
        alert('Signup successful!');
        navigate('/home');
      } else {
        alert('Signup failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      alert('Signup failed: ' + (error.response?.data?.message || 'Unexpected error occurred'));
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <form onSubmit={handleSignup}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirm_password}
          onChange={(e) => setconfirm_password(e.target.value)} 
          required 
        />
        <button type="submit">Signup</button>
      </form>

      <p>
        Already have an account?{' '}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
