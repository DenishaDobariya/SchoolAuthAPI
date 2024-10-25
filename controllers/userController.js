const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Sign Up
exports.signup = async (req, res) => {
  const { role, name, email, password, confirmPassword } = req.body;

  try {
    let user = await User.findOne({ email });
    console.log("user>>> ", user);
    
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hash password>>> ", hashedPassword);

    user = new User({
      role,
      name,
      email,
      password: hashedPassword,
    });

    console.log("register user",user);
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log("register token>>> ",token);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log("login token>>> ",token);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
