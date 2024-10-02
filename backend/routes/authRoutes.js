const express = require('express');
const bcrypt = require('bcryptjs'); // Import bcrypt for hashing
const router = express.Router();
const User = require('../models/User');

// POST /api/auth (Signup Route)
router.post('/', async (req, res) => {
  const { name, email, password, type } = req.body;

  // Simple validation
  if (!name || !email || !password || !type) {
    return res.status(400).json({ success: false, message: 'Please fill all fields' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Create new user with hashed password
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Store the hashed password
      type
    });

    await newUser.save();

    return res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.error('Error during user creation:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/auth/login (Login Route)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please fill all fields' });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // If password matches, send success response and user data
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
