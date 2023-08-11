
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ handleLogout }) => {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/dashboard">Expense Tracker</Link>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;