import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import firebaseApp from './firebase';
import Header from './components/Home/Header';
import Dashboard from './components/Profile/Dashboard';
import CompleteProfile from './components/Profile/CompleteProfile';
import Signup from './components/Home/Signup';
import Login from './components/Home/Login';
import ForgotPassword from './components/Profile/ForgotPassword';
import ExpenseTracker from './components/ExpenseTracker/ExpenseTracker';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsAuthenticated(false);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <div>
      {isAuthenticated && <Header handleLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/expense-tracker" element={<ExpenseTracker />} />
      </Routes>
    </div>
  );
};

export default App;
