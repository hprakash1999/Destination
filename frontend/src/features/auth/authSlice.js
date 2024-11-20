import { createSlice } from "@reduxjs/toolkit";
import { loginExistedUser } from "../features.js";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: localStorage.getItem("accessToken") || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    // Reducer to handle logout
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem("accessToken");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginExistedUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginExistedUser.fulfilled, (state, action) => {
        const { user, accessToken } = action.payload;
        state.user = user;
        state.accessToken = accessToken;
        state.isLoading = false;
        state.error = null;

        // Store access token in localStorage
        localStorage.setItem("accessToken", accessToken);
      })
      .addCase(loginExistedUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to login user";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
