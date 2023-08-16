// import React, { useState, useEffect , useContext } from 'react';
// import { getDatabase, ref, push, remove, update } from 'firebase/database';

// import { useDispatch, useSelector  } from 'react-redux';
// import {
//   increment,
//   decrement,
//   incrementBy2,
//   decrementBy2,
//   incrementBy5,
//   decrementBy5,
// } from '../Profile/counterSlice';
// import { getAuth } from 'firebase/auth';
// import firebaseApp from '../../firebase';
// import './ExpenseTracker.css';
// import Login from '../Home/Login';
// import { addExpense } from '../ExpenseTracker/redux/expenseSlice';
// import { AppContext } from '../../App'; 
// import themeReducer
//  from './themeReducer';
// const database = getDatabase(firebaseApp);
// const auth = getAuth(firebaseApp);

// const ExpenseTracker = () => {
//   const [moneySpent, setMoneySpent] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');

//   const [editingExpenseId, setEditingExpenseId] = useState(null);
//   const [updatedMoneySpent, setUpdatedMoneySpent] = useState('');
//   const [updatedDescription, setUpdatedDescription] = useState('');
//   const [updatedCategory, setUpdatedCategory] = useState('');
//   const count = useSelector((state) => state.counter.count);
//   const expenses = useSelector((state) => state.expenses.expenses);
//   const dispatch = useDispatch();

//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const { theme, dispatch: themeDispatch } = useContext(AppContext); 
  

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//     });

//     return () => unsubscribe();
//   }, [expenses]);

//   const [totalExpenses, setTotalExpenses] = useState(0);
//   useEffect(() => {
//     const calculateTotalExpenses = () => {
//       const total = expenses.reduce((acc, expense) => acc + expense.moneySpent, 0);
//       setTotalExpenses(total);
//     };

//     calculateTotalExpenses();
//   }, [expenses]);

//   const handleThemeToggle = () => {
//     // Dispatch an action to toggle the theme using the theme reducer
//     dispatch({ type: 'TOGGLE_THEME' });
//   };
 
//   const handleActivatePremium = () => {
   
//   };



//   const handleExpenseSubmit = async (e) => {
//     e.preventDefault();
//     const newExpense = {
//       moneySpent: parseFloat(moneySpent),
//       description,
//       category,
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       await push(ref(database, `users/${auth.currentUser?.uid}/expenses`), newExpense);

//       // Dispatch the action to update the Redux store
//       dispatch(addExpense(newExpense)); // Replace "addExpense" with the actual action creator

//       setMoneySpent('');
//       setDescription('');
//       setCategory('');
//     } catch (error) {
//       console.error('Error adding expense:', error);
//     }
//   };

//   const handleDeleteExpense = async (expenseId) => {
//     try {
//       await remove(ref(database, `users/${auth.currentUser?.uid}/expenses/${expenseId}`));
//       console.log('Expense successfully deleted');
//     } catch (error) {
//       console.error('Error deleting expense:', error);
//     }
//   };

//   const handleEditExpense = async (expenseId) => {
//     try {
//       const updatedExpense = {
//         moneySpent: parseFloat(updatedMoneySpent),
//         description: updatedDescription,
//         category: updatedCategory,
//       };
//       await update(ref(database, `users/${auth.currentUser?.uid}/expenses/${expenseId}`), updatedExpense);
//       console.log('Expense successfully updated');
//       setEditingExpenseId(null);
//     } catch (error) {
//       console.error('Error updating expense:', error);
//     }
//   };

//   const handleEditButtonClick = (expense) => {
//     setEditingExpenseId(expense.id);
//     setUpdatedMoneySpent(expense.moneySpent.toString());
//     setUpdatedDescription(expense.description);
//     setUpdatedCategory(expense.category);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//   };

//   if (!isAuthenticated) {
//     return <Login setIsAuthenticated={setIsAuthenticated} />;
//   }
//   console.log(expenses);

//   return (
//     <div className="expense-tracker">
//         <button onClick={handleThemeToggle}>Toggle Theme</button>
//        <form onSubmit={handleExpenseSubmit}>
//         <div className="form-group">
//           <label htmlFor="moneySpent">Money Spent</label>
//           <input
//             type="number"
//             id="moneySpent"
//             value={moneySpent}
//             onChange={(e) => setMoneySpent(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description</label>
//           <input
//             type="text"
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="category">Category</label>
//           <input
//             type="text"
//             id="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Add Expense</button>
//       </form>

//       <div className="expense-list">
//       {expenses.map((expense) => (
//           <div key={expense.id} className="expense-item">
//             <p>Money Spent: {expense.moneySpent}</p>
//             <p>Description: {expense.description}</p>
//             <p>Category: {expense.category}</p>
//             <button onClick={() => handleEditButtonClick(expense)}>Edit</button>
//             <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
//           </div>
//         ))}
//       </div>

//       {totalExpenses > 10000 && (
//         <button className="premium-button" onClick={handleActivatePremium}>
//           Activate Premium
//         </button>
//       )}
    
//       <div className="counter">
//         <h2>Counter: {count}</h2>
//         <button onClick={() => dispatch(increment())}>Increment</button>
// <button onClick={() => dispatch(decrement())}>Decrement</button>
// <button onClick={() => dispatch(incrementBy2())}>Increment by 2</button>
// <button onClick={() => dispatch(decrementBy2())}>Decrement by 2</button>
// <button onClick={() => dispatch(incrementBy5())}>Increment by 5</button>
// <button onClick={() => dispatch(decrementBy5())}>Decrement by 5</button>

//       </div>
//     </div>
//   );
// };

// export default ExpenseTracker;

import React, { useState, useEffect, useContext } from 'react';
import { getDatabase, ref, push, remove, update } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import {
  increment,
  decrement,
  incrementBy2,
  decrementBy2,
  incrementBy5,
  decrementBy5,
} from '../Profile/counterSlice';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../../firebase';
import './ExpenseTracker.css';
import Login from '../Home/Login';
import { addExpense } from '../ExpenseTracker/redux/expenseSlice';
import { useAppContext } from '../../AppContext';
import { documentId } from '@firebase/firestore';
import { AppContext } from '../../AppContext';

const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

const ExpenseTracker = () => {
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [updatedMoneySpent, setUpdatedMoneySpent] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState('');
  const [isPremiumActivated, setIsPremiumActivated] = useState(false);

  const count = useSelector((state) => state.counter.count);
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme, dispatch: themeDispatch } = useContext(AppContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [expenses]);

  const [totalExpenses, setTotalExpenses] = useState(0);
  useEffect(() => {
    const calculateTotalExpenses = () => {
      const total = expenses.reduce((acc, expense) => acc + expense.moneySpent, 0);
      setTotalExpenses(total);
    };

    calculateTotalExpenses();
  }, [expenses]);

  
  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    const newExpense = {
      moneySpent: parseFloat(moneySpent),
      description,
      category,
      createdAt: new Date().toISOString(),
    };

    try {
      await push(ref(database, `users/${auth.currentUser?.uid}/expenses`), newExpense);

      // Dispatch the action to update the Redux store
      dispatch(addExpense(newExpense));

      setMoneySpent('');
      setDescription('');
      setCategory('');
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await remove(ref(database, `users/${auth.currentUser?.uid}/expenses/${expenseId}`));
      console.log('Expense successfully deleted');
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEditExpense = async (expenseId) => {
    try {
      const updatedExpense = {
        moneySpent: parseFloat(updatedMoneySpent),
        description: updatedDescription,
        category: updatedCategory,
      };
      await update(ref(database, `users/${auth.currentUser?.uid}/expenses/${expenseId}`), updatedExpense);
      console.log('Expense successfully updated');
      setEditingExpenseId(null);
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const handleEditButtonClick = (expense) => {
    setEditingExpenseId(expense.id);
    setUpdatedMoneySpent(expense.moneySpent.toString());
    setUpdatedDescription(expense.description);
    setUpdatedCategory(expense.category);
  };

  const handleActivatePremium = () => {
    if (totalExpenses > 10000) {
      setIsPremiumActivated(true);
      themeDispatch({ type: 'TOGGLE_THEME' });
    }
  };
 
  const handleThemeToggle = () => {
    // Dispatch an action to toggle the theme using the theme reducer
    themeDispatch({ type: 'TOGGLE_THEME' });
  };


  const handleDownloadFile = () => {
   
    const csvData = expenses.map((expense) =>
      `${expense.moneySpent},${expense.description},${expense.category},${expense.createdAt}`
    );

    const blob = new Blob([csvData.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();

   
    URL.revokeObjectURL(url);

    console.log('File download initiated!');
  };


  return (
    <div className={`expense-tracker ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <div className="top-bar">
        <button className={`activate-premium-button ${isPremiumActivated ? 'active' : ''}`} onClick={handleActivatePremium}>
          Activate Premium
        </button>
        <label className="theme-switch">
          <input type="checkbox" checked={theme === 'dark'} onChange={handleThemeToggle} />
          <span className="slider"></span>
        </label>
        <button className="download-file-button" onClick={handleDownloadFile} disabled={!isPremiumActivated}>
          Download File
        </button>
      </div>
      <form className="expense-form" onSubmit={handleExpenseSubmit}>
        <div className="form-group">
          <label htmlFor="moneySpent">Money Spent</label>
          <input
            type="number"
            id="moneySpent"
            value={moneySpent}
            onChange={(e) => setMoneySpent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>

      <div className="expense-list">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <p>Money Spent: {expense.moneySpent}</p>
            <p>Description: {expense.description}</p>
            <p>Category: {expense.category}</p>
            <button onClick={() => handleEditButtonClick(expense)}>Edit</button>
            <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
          </div>
        ))}
      </div>

    

      <div className="counter">
        <h2>Counter: {count}</h2>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(incrementBy2())}>Increment by 2</button>
        <button onClick={() => dispatch(decrementBy2())}>Decrement by 2</button>
        <button onClick={() => dispatch(incrementBy5())}>Increment by 5</button>
        <button onClick={() => dispatch(decrementBy5())}>Decrement by 5</button>
      </div>
    </div>
  );
};

export default ExpenseTracker;
