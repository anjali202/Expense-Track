import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
 import firebaseConfig from '../../firebaseConfig'; // Import the Firebase configuration
import './Signup.css';



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationSent, setVerificationSent] = useState(false); // To track whether verification email is sent
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    try {
      // Create user account using Firebase Authentication
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('User has successfully signed up.');

      // Send email verification
      const user = firebase.auth().currentUser;
      if (user) {
        await user.sendEmailVerification();
        setVerificationSent(true); // Set verificationSent state to true
        console.log('Verification email sent.');
      }

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        <p>
          Have an account already? <Link to="/login">Login</Link>
        </p>

        {!verificationSent && (
          <button
            onClick={async () => {
              try {
                const user = firebase.auth().currentUser;
                if (user) {
                  await user.sendEmailVerification();
                  setVerificationSent(true);
                  console.log('Verification email sent.');
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