const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.validate(); // trigger schema validation
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: `Validation error: ${messages.join(', ')}` });
    }
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
