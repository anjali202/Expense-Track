import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './components/Profile/counterReducer';
import authReducer from './components/ExpenseTracker/redux/authSlice';
import expensesReducer from './components/ExpenseTracker/redux/expenseSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer, // Make sure the key matches the key used in useSelector
    auth: authReducer,
    expenses: expensesReducer,
  },
});

export default store;
