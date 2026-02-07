import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import ItemsList from './components/ItemsList';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);
      console.log('App - Token loaded:', token);
      console.log('App - User loaded:', userData);
    }
  }, [token]);

  const handleLogin = (newToken, userData) => {
    console.log('App - Login successful, token:', newToken);
    console.log('App - User data:', userData);
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/users/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  return (
    <div className="App">
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <ItemsList token={token} user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
