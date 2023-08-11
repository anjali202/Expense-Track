import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../../firebase';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!isEmailValid(email)) {
      setLoginError('Invalid email format. Please enter a valid email address.');
      return;
    }

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      // User has successfully logged in
      setIsAuthenticated(true);
      setLoginError('');
      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (error) {
      setLoginError('Invalid email or password. Please try again.');
      console.error('Error logging in:', error);
    }
  };

  if (isAuthenticated) {
    // If the user is logged in, redirect to the dashboard
    navigate('/dashboard');
    return null; 
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={(e) => e.preventDefault()} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="button-primary" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p>
        Haven't account already? <Link to="/signup">Sign up here</Link>
      </p>
      <Link to="/forgot-password">Forgot Password</Link>
      {loginError && <div className="error">{loginError}</div>}
    </div>
  );
};

export default Login;
