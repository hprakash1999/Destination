import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchListings } from "../../api/api.js";

// Async action to fetch listings
export const getAllListings = createAsyncThunk(
  "listings/getAllListings",
  async (params, { rejectWithValue }) => {
    try {
      const listings = await fetchListings(params);
      return listings;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch listings"
      );
    }
  }
);
