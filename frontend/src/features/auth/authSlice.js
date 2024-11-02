import { createSlice } from "@reduxjs/toolkit";
import { loginExistedUser } from "../features.js";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    // Reducer to handle logout
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginExistedUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginExistedUser.fulfilled, (state, action) => {
        const { user, accessToken, refreshToken } = action.payload;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginExistedUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to login user";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
