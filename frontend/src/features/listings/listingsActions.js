import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchListings } from "../../api/listings.js";

// Async action to fetch listings
export const getAllListings = createAsyncThunk(
  "listings/getAllListings",
  async (params, { rejectWithValue }) => {
    try {
      const { listings, totalListings, totalPages } = await fetchListings(
        params
      );
      return { listings, totalListings, totalPages };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch listings"
      );
    }
  }
);
