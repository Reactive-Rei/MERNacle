// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Your User model
const authMiddleware = require('../middleware/auth');

// Get all users
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('name email _id'); // Select fields you need
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;