import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import '../style/Login.css';
import apples from '../assets/apples.svg';

const apiUrl = process.env.REACT_APP_HEROKU_URL || 'http://localhost:5000';

const Signup = ({ setToken }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${apiUrl}/api/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      signIn(data.token);
      navigate('/'); // Navigate to home on successful signup
    } else {
      alert('Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <div className="svg-container">
          <img src={apples} alt="Login Illustration" />
      </div>

      <div className="sign-up-form-container">
        <div className="sign-up-form-container-information">
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>

            <input
              placeholder='First Name'
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              placeholder='Last Name'
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

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
            <div className='signup-buttons'>
              <button type="submit">Signup</button>
              <button onClick={() => navigate('/login')}>Back to Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
