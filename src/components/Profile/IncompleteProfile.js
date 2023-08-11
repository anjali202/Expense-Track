// IncompleteProfile.js
import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../../firebase';
import { getDatabase, ref, update } from 'firebase/database';

const IncompleteProfile = ({ onClickComplete }) => {
  const [fullName, setFullName] = useState('');
  const [githubProfileUrl, setGithubProfileUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;

    try {
      if (user && user.uid) {
        const database = getDatabase(firebaseApp);
        const userRef = ref(database, `users/${user.uid}`);

        // Update the profile data
        await update(userRef, {
          fullName: fullName,
          githubProfileUrl: githubProfileUrl,
          profileCompleted: true,
        });

        // Call the onClickComplete function to hide the IncompleteProfile component
        onClickComplete();
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div className="incomplete-profile">
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="githubProfileUrl">Github Profile URL:</label>
          <input
            type="text"
            id="githubProfileUrl"
            value={githubProfileUrl}
            onChange={(e) => setGithubProfileUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default IncompleteProfile;
