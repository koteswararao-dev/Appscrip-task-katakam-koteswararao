import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Login = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (isSignup) {
        await axios.post(`${API_URL}/users`, { username, password });
        setSuccess('User registered successfully! Please login.');
        setIsSignup(false);
        setPassword('');
      } else {
        const response = await axios.post(`${API_URL}/users/login`, { username, password });
        onLogin(response.data.token, response.data.user);
      }
    } catch (err) {
      const message = err.response?.data?.message || 'An error occurred';
      setError(message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <span className="login-logo-icon">RR</span>
          <span className="login-logo-text">STORE</span>
        </div>
        <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
        
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        
        <p className="toggle-text">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button 
            className="btn-link" 
            onClick={() => {
              setIsSignup(!isSignup);
              setError('');
              setSuccess('');
            }}
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
