const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

const signup = async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    console.log('Request body:', req.body);
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new User({ firstName, lastName, username, password: hashedPassword });
    await newUser.save();
    
    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
    
    // Return token as JSON
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Internal server error');
  }
};


const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).send('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send('Invalid credentials');

  // Sign token with userId in payload
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
};


module.exports = { signup, login };
