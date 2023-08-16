


// import React, { useState, useEffect } from 'react';
// import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'; // Import Navigate
// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import firebaseApp from './firebase';
// import Header from './components/Home/Header';
// import Dashboard from './components/Profile/Dashboard';
// import CompleteProfile from './components/Profile/CompleteProfile';
// import Signup from './components/Home/Signup';
// import Login from './components/Home/Login';
// import ForgotPassword from './components/Profile/ForgotPassword';
// import Home from './components/Home/Home';
// import ExpenseTracker from './components/ExpenseTracker/ExpenseTracker';
// import themeReducer from './components/ExpenseTracker/themeReducer';
// export const AppContext = React.createContext();

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();
//   const auth = getAuth(firebaseApp);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//     });

//     return () => unsubscribe();
//   }, [auth]);

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         setIsAuthenticated(false);
//         navigate('/login');
//       })
//       .catch((error) => {
//         console.error('Error logging out:', error);
//       });
//   };

//   return (
//     <AppContext.Provider value={{ theme, dispatch: themeDispatch }}>
//     <div>
//       {isAuthenticated && <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />}
//       <Routes>
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/home" element={<Home />} />
//         <Route
//           path="/complete-profile"
//           element={isAuthenticated ? <CompleteProfile /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/my-expenses"
//           element={isAuthenticated ? <ExpenseTracker /> : <Navigate to="/login" />}
//         />
//         {!isAuthenticated && <Route path="/signup" element={<Signup />} />}
//         {!isAuthenticated && <Route path="/login" element={<Login />} />}
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         {/* Add more routes */}
//       </Routes>
//     </div>
//     </AppContext.Provider>
//   );
// };

// export default App;


// import React, { useState, useEffect } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import firebaseApp from './firebase';
// import Header from './components/Home/Header';
// import Dashboard from './components/Profile/Dashboard';
// import CompleteProfile from './components/Profile/CompleteProfile';
// import Signup from './components/Home/Signup';
// import Login from './components/Home/Login';
// import ForgotPassword from './components/Profile/ForgotPassword';
// import Home from './components/Home/Home';
// import ExpenseTracker from './components/ExpenseTracker/ExpenseTracker';
// import themeReducer from './components/ExpenseTracker/themeReducer';
// export const AppContext = React.createContext(); // Create a context for theme

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [theme, dispatch] = React.useReducer(themeReducer, 'light'); // Initialize theme state with 'light'

//   const navigate = useNavigate();
//   const auth = getAuth(firebaseApp);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsAuthenticated(true);
//         navigate('/home');
//       } else {
//         setIsAuthenticated(false);
//       }
//       setIsLoading(false);
//     });

//     return () => unsubscribe();
//   }, [auth, navigate]);

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         setIsAuthenticated(false);
//         navigate('/login');
//       })
//       .catch((error) => {
//         console.error('Error logging out:', error);
//       });
//   };

//   return (
//     <AppContext.Provider value={{ theme, dispatch }}>
//       <div>
//         {isAuthenticated && <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />}
//         <Routes>
          
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/home" element={<Home />} />
//           {isAuthenticated ? (
//             <>
//               <Route path="/complete-profile" element={<CompleteProfile />} />
//               <Route path="/my-expenses" element={<ExpenseTracker />} />
//             </>
//           ) : (
//             <Route path="/signup" element={<Signup />} />
//           )}
//           {!isAuthenticated && <Route path="/login" element={<Login />} />}
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//         </Routes>
//       </div>
//     </AppContext.Provider>
//   );
// };

// export default App;

// import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import firebaseApp from './firebase';
// import Header from './components/Home/Header';
// import Dashboard from './components/Profile/Dashboard';
// import CompleteProfile from './components/Profile/CompleteProfile';
// import Signup from './components/Home/Signup';
// import Login from './components/Home/Login';
// import ForgotPassword from './components/Profile/ForgotPassword';
// import Home from './components/Home/Home';
// import ExpenseTracker from './components/ExpenseTracker/ExpenseTracker';


import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import firebaseApp from './firebase';
import Header from './components/Home/Header';
import Dashboard from './components/Profile/Dashboard';
import CompleteProfile from './components/Profile/CompleteProfile';
import Signup from './components/Home/Signup';
import Login from './components/Home/Login';
import ForgotPassword from './components/Profile/ForgotPassword';
import Home from './components/Home/Home';
import ExpenseTracker from './components/ExpenseTracker/ExpenseTracker';
// import { AppContext } from './AppContext';
import { AppProvider } from './AppContext';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsAuthenticated(false);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <AppProvider> 
    <div>
      {isAuthenticated && <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />}
      <Routes>
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/complete-profile"
          element={isAuthenticated ? <CompleteProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-expenses"
          element={isAuthenticated ? <ExpenseTracker /> : <Navigate to="/login" />}
        />
        {!isAuthenticated && <Route path="/signup" element={<Signup />} />}
        {!isAuthenticated && <Route path="/login" element={<Login />} />}
        
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Add more routes */}
      </Routes>
    </div>
    </AppProvider>
  );
};

export default App;
