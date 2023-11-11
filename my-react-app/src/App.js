// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [signupStatus, setSignupStatus] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [logoutStatus, setLogoutStatus] = useState('');

  useEffect(() => {
    // Check if the user is already authenticated on component mount
    handleCheckLogin();
  }, []);

  const handleSignup = async () => {
  try {
    const response = await axios.post('http://localhost:5000/signup', { username, password });

    if (response && response.data && response.data.message) {
      console.log(response.data);
      setSignupStatus('Signup successful');
    } else {
      console.error('Invalid response structure:', response);
      setSignupStatus('Signup failed');
    }
  } catch (error) {
    console.error('Signup failed:', error.message);
    setSignupStatus('Signup failed');
  }
};

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password }, { withCredentials: true });
      console.log(response.data);
      setLoginStatus('Login successful');
      // After successful login, update the authenticated state
      setAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      setLoginStatus('Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:5000/logout', { withCredentials: true });
      console.log(response.data);
      setLogoutStatus('Logout successful');
      // After successful logout, update the authenticated state
      setAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error.response.data.message);
      setLogoutStatus('Logout failed');
    }
  };

  const handleCheckLogin = async () => {
    try {
      const response = await axios.get('http://localhost:5000/check_login', { withCredentials: true });
  
      if (response && response.data && response.data.message) {
        console.log(response.data);
        // Update the authenticated state based on the response
        setAuthenticated(response.data.message === 'User is logged in');
      } else {
        console.error('Invalid response structure:', response);
      }
    } catch (error) {
      console.error('Check login failed:', error.message);
    }
  };

  const handleProtectedRoute = async () => {
    try {
      const response = await axios.get('http://localhost:5000/protected', { withCredentials: true });
      console.log(response.data);
    } catch (error) {
      console.error('Access to protected route failed:', error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Authentication System</h1>
      <div>
        <label>Username: </label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={handleSignup}>Sign Up</button>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleCheckLogin}>Check Login</button>
        <button onClick={handleProtectedRoute}>Protected Route</button>
      </div>
      <div>
        {authenticated ? (
          <p>User is authenticated</p>
        ) : (
          <p>User is not authenticated</p>
        )}
        {signupStatus && <p>{signupStatus}</p>}
        {loginStatus && <p>{loginStatus}</p>}
        {logoutStatus && <p>{logoutStatus}</p>}
      </div>
    </div>
  );
}

export default App;
