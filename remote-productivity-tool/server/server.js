require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');

connectDB();

const User = require('./models/User');

// const testUser = async () => {
//   const user = new User({
//     name: 'Test User',
//     email: 'test@example.com',
//     password: 'password123',
//   });
//   await user.save();
//   console.log('Test user created');
// };
// testUser();


// Middleware
app.use(cors());
app.use(express.json());
app.use('/auth', require('./routes/auth'));
app.use('/api/auth', authRoutes);

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