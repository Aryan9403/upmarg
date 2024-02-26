const express = require('express');
const app = express();

app.use(express.json()); // This middleware should be declared before your routes

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Corrected /register route
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Make sure you have this file in your project

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      email,
      password: hashedPassword
    });
    
    await newUser.save();

    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error creating user' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // No changes here
