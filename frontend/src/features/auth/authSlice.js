import { createSlice } from "@reduxjs/toolkit";
import { loginExistedUser, refreshAccessToken } from "../features.js";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    accessToken: localStorage.getItem("accessToken") || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
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

        // Store access token and user in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(loginExistedUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to login user";
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        const { accessToken } = action.payload;
        state.accessToken = accessToken;
        state.isLoading = false;
        state.error = null;

        // Store new access token in localStorage
        localStorage.setItem("accessToken", accessToken);
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
