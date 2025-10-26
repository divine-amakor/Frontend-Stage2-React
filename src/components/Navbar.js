import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = auth.isAuthenticated();

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="logo">TicketFlow</Link>
          <div>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-secondary" style={{marginRight: '10px'}}>
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-primary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login" className="btn btn-secondary" style={{marginRight: '10px'}}>
                  Login
                </Link>
                <Link to="/auth/signup" className="btn btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;