import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../App";
import '../style/Login.css';
import peppers from '../assets/peppers.svg'; // Replace with the path to your SVG file

const apiUrl = process.env.REACT_APP_HEROKU_URL || 'http://localhost:5000';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Login successful, token:', data.token); // Debugging line
      signIn(data.token);
      navigate('/'); // Navigate to home on successful login
    } else {
      console.error('Login failed'); // Debugging line
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="svg-container">
        <img src={peppers} alt="Login Illustration" />
      </div>

      <div className="login-form-container">
        <div className="login-form-container-information">

          <h2>Login</h2>

          <form onSubmit={handleSubmit}>

            <input
              placeholder='Username'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              placeholder='Password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>

          </form>

          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;