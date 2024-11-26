import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

const Register = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    cell: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    
    // Use Date.now() as a unique ID for the user
    const newUser = { 
      id: Date.now(), // Unique ID for the user
      ...user, 
      password: hashedPassword 
    };

    await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    alert('Registration successful! Please login.');
    window.location.href = '/login';
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control" name="name" value={user.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Surname</label>
        <input type="text" className="form-control" name="surname" value={user.surname} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Email address</label>
        <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Cell Number</label>
        <input type="text" className="form-control" name="cell" value={user.cell} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
};

export default Register;
