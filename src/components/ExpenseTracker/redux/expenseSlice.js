// expensesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses: [],
    totalExpenses: 0,
    showPremiumButton: false,
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
      state.totalExpenses += action.payload.amount;
      state.showPremiumButton = state.totalExpenses > 10000;
    },
    
  },
});

export const { addExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
