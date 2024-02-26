const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Login failed' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Login failed' });
    }

    // Create token (replace 'your_jwt_secret' with an actual secret key)
    const token = jwt.sign({ userId: user._id }, 'aryan', { expiresIn: '1h' });

    res.status(200).send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});
