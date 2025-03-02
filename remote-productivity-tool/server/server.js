require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const usersRouter = require('./routes/users');

connectDB();

const Team = require('./models/Team');

// Middleware
app.use(cors());
app.use(express.json());
// app.use('/auth', require('./routes/auth'));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/users', usersRouter);

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/api/test', (req, res) => {
  res.send('Backend is working');
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});