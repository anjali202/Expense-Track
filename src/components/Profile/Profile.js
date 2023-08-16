import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import firebaseApp from '../../firebase';
import Login from '../Home/Login';
import IncompleteProfile from './IncompleteProfile';

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showIncompleteProfile, setShowIncompleteProfile] = useState(false);
  const [fullName, setFullName] = useState('');
  const [githubUrl, setGithubUrl] = useState('');

  const auth = getAuth(firebaseApp);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const db = getFirestore(firebaseApp);
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setFullName(userData.fullName || '');
            setGithubUrl(userData.githubProfileUrl || '');
            setShowIncompleteProfile(!userData.profileCompleted);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        fetchData(); // Fetch user data when authenticated
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const handleProfileUpdate = async () => {
    try {
      if (user) {
        const db = getFirestore(firebaseApp);
        const userDocRef = doc(db, 'users', user.uid);

        await updateDoc(userDocRef, {
          fullName,
          githubProfileUrl: githubUrl,
          profileCompleted: true,
        });

        setShowIncompleteProfile(false);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  if (!isAuthenticated) {
    return <Login setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <div>
      <h2>My Profile</h2>
      <p>Full Name: {fullName}</p>
      <p>GitHub URL: {githubUrl}</p>
      <button onClick={() => setShowIncompleteProfile(true)}>Update Profile</button>
      {showIncompleteProfile && (
        <IncompleteProfile
          fullName={fullName}
          githubProfileUrl={githubUrl}
          onProfileUpdate={handleProfileUpdate}
          onClickComplete={() => setShowIncompleteProfile(false)}
        />
      )}
    </div>
  );
};

export default Profile;
