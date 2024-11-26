import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3001/users?email=${email}`);
    const users = await response.json();

    if (users.length > 0) {
      const user = users[0];
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (isPasswordValid) {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/';
      } else {
        alert('Invalid password');
      }
    } else {
      alert('User not found');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email address</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;
