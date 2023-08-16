import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './Header.css';

const Header = ({ isAuthenticated, handleLogout }) => {
  const auth = getAuth();

  return (
    <header>
      <h1 className="expense-tracker-title">EXPENSE TRACKER</h1>
      <nav>
        <ul>
          {isAuthenticated && (
            <>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/my-expenses">My Expenses</Link>
              </li>
              <li>
                <Link to="/complete-profile">My Profile</Link>
              </li>
              <li>
                <button onClick={() => signOut(auth)}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
