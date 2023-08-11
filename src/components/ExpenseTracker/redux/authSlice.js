// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    token: null,
    userId: null,
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.token = null;
      state.userId = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
