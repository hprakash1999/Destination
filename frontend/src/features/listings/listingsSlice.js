import { createSlice } from "@reduxjs/toolkit";
import { getAllListings } from "../features.js";

const listingsSlice = createSlice({
  name: "listings",
  initialState: {
    listings: [],
    status: "idle",
    error: null,
  },

  // Reducers to fetch all listings
  extraReducers: (builder) => {
    builder
      .addCase(getAllListings.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllListings.fulfilled, (state, action) => {
        state.status = "success";
        state.listings = action.payload;
      })
      .addCase(getAllListings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default listingsSlice.reducer;
