const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Ensure this path matches your file structure
const jwt = require('jsonwebtoken'); // Assuming you're using JWT for authMiddleware
const authMiddleware = require('./Middleware/AuthMiddleware'); // Path to your auth middleware

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Example of using the authMiddleware
app.get('/some-protected-route', authMiddleware, (req, res) => {
  res.send('Access granted to protected data.');
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    
    await newUser.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error creating user' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
