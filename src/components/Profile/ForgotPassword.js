// ForgotPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);

      setSuccessMessage('Password reset email sent. Please check your inbox.');
      setIsLoading(false);
    } catch (error) {
      setError('Failed to send password reset email. Please check your email address and try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="button-primary">
          {isLoading ? 'Sending...' : 'Reset Password'}
        </button>
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
      </form>
      <Link to="/login">Back to Login</Link>
    </div>
  );
};

export default ForgotPassword;
