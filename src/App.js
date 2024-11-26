import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import Shopping from './components/pages/Shopping';
import store from './store';
import { Provider } from 'react-redux';

// PrivateRoute component for protected routes
const PrivateRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null; // Render nothing while navigating
  }

  return element; // Return the protected component if user is authenticated
};

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Provider store={store}>
      <Router>
        <Navbar user={user} />
        <div className="container mt-4">
          <Routes>
            {/* Home route should be protected now */}
            <Route path="/" element={<PrivateRoute element={<Home />} />} /> 
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            <Route path="/shopping_list" element={<PrivateRoute element={<Shopping />} />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
