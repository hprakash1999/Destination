import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import listingsReducer from "../features/listings/listingsSlice.js";

// Configure store
const store = configureStore({
  reducer: {
    listings: listingsReducer,
    auth: authReducer,
  },
});

export default store;
