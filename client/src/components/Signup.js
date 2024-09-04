import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import './Login.css';
import apples from '../assets/apples.svg';

const Signup = ({ setToken }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Username:', username);
    console.log('Password:', password);

    const response = await fetch('http://localhost:3001/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Signup successful, token:', data.token); // Debugging line
      signIn(data.token);
      navigate('/'); // Navigate to home on successful signup
    } else {
      console.error('Signup failed'); // Debugging line
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
          <button onClick={() => navigate('/login')}>Back to Login</button>
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <p>
              First Name
            </p>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <p>
              Last Name
            </p>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
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
            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
