import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    surname: '',
    email: '',
    cell: '',
  });

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedUser);
    if (loggedUser) {
      setUpdatedUser({
        name: loggedUser.name,
        surname: loggedUser.surname,
        email: loggedUser.email,
        cell: loggedUser.cell,
      });
    }
  }, []);

  const handleUpdateChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3001/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...user, ...updatedUser }),
    });

    if (response.ok) {
      alert('Profile updated successfully!');
      const updatedData = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedData));
      setUser(updatedData);
    } else {
      alert('Error updating profile.');
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3001/users/${user.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Profile deleted successfully!');
      localStorage.removeItem('user');
      window.location.href = '/register'; // Redirect to registration or login
    } else {
      alert('Error deleting profile.');
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {user && (
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={updatedUser.name}
              onChange={handleUpdateChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Surname</label>
            <input
              type="text"
              className="form-control"
              name="surname"
              value={updatedUser.surname}
              onChange={handleUpdateChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={updatedUser.email}
              onChange={handleUpdateChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Cell Number</label>
            <input
              type="text"
              className="form-control"
              name="cell"
              value={updatedUser.cell}
              onChange={handleUpdateChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      )}
      {user && (
        <button className="btn btn-danger mt-4" onClick={handleDelete}>
          Delete Profile
        </button>
      )}
    </div>
  );
};

export default Profile;
