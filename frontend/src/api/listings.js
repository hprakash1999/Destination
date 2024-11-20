import api from "./api.js";

// Function to fetch all listings
export const fetchListings = async (params = {}) => {
  try {
    const response = await api.get("/listings", {
      params: { ...params },
    });

    console.log("Listings fetched:", response.data);

    return {
      listings: response.data.data.listings,
      totalListings: response.data.data.totalListings,
      totalPages: response.data.data.totalPages,
    };
  } catch (err) {
    console.error("Failed to fetch listings:", err);
    throw err;
  }
};

// Function to fetch listing by ID
export const fetchListingById = async (listingId) => {
  try {
    const response = await api.get(`/listings/${listingId}`);

    console.log("Listing details fetched:", response.data);

    return response.data.data;
  } catch (err) {
    console.error("Failed to fetch listing details:", err);
    throw err;
  }
};
