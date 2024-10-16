import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.');
      return;
    }

    if (password !== confirm_password) {
      alert('Passwords do not match!');
      return;
    }

    const payload = { username, email, password, confirm_password };
  
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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="card-title text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input 
              type="text" 
              id="username" 
              className="form-control" 
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email" 
              id="email" 
              className="form-control" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              id="password" 
              className="form-control" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <small className="form-text text-muted">
              Must be 8 characters or more with at least one uppercase, one lowercase, one number, and one special character.
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
            <input 
              type="password" 
              id="confirm_password" 
              className="form-control" 
              placeholder="Confirm your password"
              value={confirm_password}
              onChange={(e) => setconfirm_password(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn w-100" style={{ backgroundColor: '#ff7f50', color: 'white' }}>Sign Up</button>
        </form>
        <p className="text-center mt-3 mb-0">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
