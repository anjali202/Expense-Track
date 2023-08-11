import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebaseApp from '../../firebase';

const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const CompleteProfile = () => {
  const [fullName, setFullName] = useState('');
  const [githubProfileURL, setGithubProfileURL] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formVisible, setFormVisible] = useState(true);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const updatedProfile = {
      fullName,
      githubProfileURL,
      profileCompleted: true,
    };

    try {
      const userRef = doc(firestore, 'users', auth.currentUser.uid);
      await setDoc(userRef, updatedProfile, { merge: true });
      setSuccessMessage('Profile updated successfully.');
      setFormVisible(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="complete-profile">
      {formVisible ? (
        <>
          <h2>Complete Your Profile</h2>
          <form onSubmit={handleProfileUpdate}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="githubProfileURL">GitHub Profile URL</label>
              <input
                type="text"
                id="githubProfileURL"
                value={githubProfileURL}
                onChange={(e) => setGithubProfileURL(e.target.value)}
              />
            </div>
            <button type="submit">Update</button>
          </form>
        </>
      ) : (
        <p>{successMessage}</p>
      )}
    </div>
  );
};

export default CompleteProfile;
