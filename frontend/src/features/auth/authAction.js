import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerNewUser } from "../../api/api";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (registerData, { rejectWithValue }) => {
    try {
      const response = await registerNewUser(registerData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to register user"
      );
    }
  }
);
