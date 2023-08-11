import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import { initializeApp } from 'firebase/app';

import { getDatabase, ref, update } from 'firebase/database';


i

const UpdateUserProfile = () => {
  const [fullName, setFullName] = useState('');
  const [githubProfileUrl, setGithubProfileUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = getAuth().currentUser;
      if (!user) {
        console.error('User not logged in.');
        return;
      }

      const idToken = await user.getIdToken();
      if (!idToken) {
        console.error('Unable to get user ID token.');
        return;
      }

      const updateProfileEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCB-V2J0hIfruhsJcsXuNDyzsUihGC1zMM`;

      const payload = {
        idToken: idToken,
        displayName: fullName,
        photoUrl: githubProfileUrl,
        returnSecureToken: true,
      };

      const response = await axios.post(updateProfileEndpoint, payload);

      console.log('Profile updated successfully!', response.data);
    } catch (error) {
      console.error('Error updating user profile:', error.response.data);
    }
  };

  return (
    <div className="container">
      <h2>Update Your Profile</h2>
      <form onSubmit={handleSubmit} className="update-profile">
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          value={githubProfileUrl}
          onChange={(e) => setGithubProfileUrl(e.target.value)}
          placeholder="Github Profile URL"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUserProfile;
