import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../../api/api.js";
import { logout } from "./authSlice.js";

// Async action to login user
export const loginExistedUser = createAsyncThunk(
  "auth/loginExistedUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const { user, refreshToken, accessToken } = await loginUser(credentials);
      return { user, refreshToken, accessToken };
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
    } catch (error) {
      console.error("Failed to log out:", error);
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  }
);
