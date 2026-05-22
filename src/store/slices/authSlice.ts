import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

interface User {
  role: string;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      const token = action.payload.token;

      try {
        const decoded = jwtDecode<User>(token);
        state.token = token;
        state.user = decoded;
        state.isAuthenticated = true;
      } catch (error) {
        console.error("Invalid token:", error);
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token'); // Clear invalid token
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;