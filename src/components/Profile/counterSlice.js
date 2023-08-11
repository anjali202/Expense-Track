import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementBy2: (state) => {
      state.count += 2;
    },
    decrementBy2: (state) => {
      state.count -= 2;
    },
    incrementBy5: (state) => {
      state.count += 5;
    },
    decrementBy5: (state) => {
      state.count -= 5;
    },
  },
});

export const { increment, decrement, incrementBy2, decrementBy2, incrementBy5, decrementBy5 } = counterSlice.actions;

export default counterSlice.reducer;
