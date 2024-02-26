import React, { useState } from 'react';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Define handleRegister inside RegisterPage to access email and password states
  const handleRegister = async () => {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data); // Handle the response from your server here
  };

  // Simplified handleSubmit to call handleRegister directly
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterPage;
