import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import firebase from './firebase'; // Update the path to the firebase module

const auth = getAuth(firebase);

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      throw error;
    }
  };

  return { user, login, logout };
};
export default useAuth;
