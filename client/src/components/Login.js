import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../App";
import './Login.css';
import peppers from '../assets/peppers.svg'; // Replace with the path to your SVG file

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/api/users/login', {
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

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <p>
            Username
          </p>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <p>
            Password
          </p>

          <input
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
  );
};

export default Login;