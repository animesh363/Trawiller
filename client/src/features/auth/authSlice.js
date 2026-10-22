import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  vendorProfile: null,
  isAuthenticated: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, vendorProfile } = action.payload;
      state.user = user;
      state.vendorProfile = vendorProfile || null;
      state.isAuthenticated = !!user;
      state.isInitialized = true;
    },
    logoutState: (state) => {
      state.user = null;
      state.vendorProfile = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },
});

export const { setCredentials, logoutState, setInitialized } = authSlice.actions;
export const logout = logoutState;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectVendorProfile = (state) => state.auth.vendorProfile;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsInitialized = (state) => state.auth.isInitialized;
