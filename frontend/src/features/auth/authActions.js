import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  refreshAccessToken as refreshAccessTokenAPI,
} from "../../api/auth.js";
import { logout } from "./authSlice.js";

// Async action to login user
export const loginExistedUser = createAsyncThunk(
  "auth/loginExistedUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const { user, accessToken } = await loginUser(credentials);
      return { user, accessToken };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to login user"
      );
    }
  }
);

// Async action to logout user
export const logoutCurrentUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    try {
      await logoutUser();

      dispatch(logout());
    } catch (err) {
      console.error("Failed to log out:", err);
      throw new Error(err.response?.data?.message || "Logout failed");
    } finally {
      dispatch(logout());
    }
  }
);

// Async action to refresh access token
export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, { rejectWithValue }) => {
    try {
      const newAccessToken = await refreshAccessTokenAPI();
      return { accessToken: newAccessToken };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Session expired. Please log in again."
      );
    }
  }
);
