import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import firebaseApp from '../../firebase';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  const auth = getAuth(firebaseApp); // Add this line to get the auth instance

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    try {
      // Use the auth instance to create a user with email and password
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        setVerificationSent(true);
      }

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
        <p>
          Have an account already? <Link to="/login">Login</Link>
        </p>
        {!verificationSent && (
          <button
            type="button"
            onClick={async () => {
              try {
                const user = auth.currentUser;
                if (user) {
                  await sendEmailVerification(user);
                  setVerificationSent(true);
                }
              } catch (error) {
                alert(error.message);
              }
            }}
          >
            Verify Email
          </button>
        )}
      </form>
    </div>
  );
};

export default Signup;
