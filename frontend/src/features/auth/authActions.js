import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../api/api.js";

// Async action to log in the user
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
