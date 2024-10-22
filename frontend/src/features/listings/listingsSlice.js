import { createSlice } from "@reduxjs/toolkit";
import { getAllListings } from "../features.js";

const listingsSlice = createSlice({
  name: "listings",
  initialState: {
    listings: [],
    status: "idle",
    error: null,
    totalListings: 0,
    totalPages: 0,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllListings.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllListings.fulfilled, (state, action) => {
        state.status = "success";
        state.listings = action.payload.listings;
        state.totalListings = action.payload.totalListings;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllListings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default listingsSlice.reducer;
