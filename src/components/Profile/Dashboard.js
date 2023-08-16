// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import IncompleteProfile from '../Profile/IncompleteProfile';
import CompleteProfile from '../Profile/CompleteProfile';
import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../../firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import Header from '../Home/Header';
import ExpenseTracker from '../ExpenseTracker/ExpenseTracker';


const database = getDatabase(firebaseApp);

const Dashboard = () => {
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;

  const count = useSelector((state) => state.count);

  const handleCompleteProfile = () => {
    setProfileCompleted(true);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User has successfully logged out.');
        navigate('/login');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const checkProfileCompletion = () => {
      try {
        if (user && user.uid) {
          const userRef = ref(database, `users/${user.uid}`);
          onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              setProfileCompleted(userData.profileCompleted);
            }
            setIsLoading(false);
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setIsLoading(false);
      }
    };

    checkProfileCompletion();
  }, [user, database]);

  return (
    <div className="dashboard-container">
    <header className="dashboard-header">
      <br></br>
      <button onClick={handleLogout}>Logout</button>
    </header>
    {isLoading ? (
      <div>Loading...</div>
    ) : !profileCompleted ? (
      <IncompleteProfile onClickComplete={handleCompleteProfile} />
    ) : (
      <>
       
        <ExpenseTracker />
      </>
    )}
  </div>
);
  
};

export default Dashboard;
