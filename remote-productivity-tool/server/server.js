require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/auth', require('./routes/auth'));

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