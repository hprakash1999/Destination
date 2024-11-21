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

// Function to create a new listing
export const createListing = async (newListingData) => {
  try {
    // Create a form data to send listings data
    const formData = new FormData();

    // Append fields to FormData
    Object.keys(newListingData).forEach((key) => {
      formData.append(key, newListingData[key]);
    });

    const response = await api.post("/listings", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Listing created:", response.data);

    return response.data.data;
  } catch (err) {
    console.log("Failed to create listing:", err);
    throw err;
  }
};
