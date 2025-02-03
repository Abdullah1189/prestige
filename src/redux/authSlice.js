import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    userData: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload; // Save admin data (e.g., name, role, etc.)
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
