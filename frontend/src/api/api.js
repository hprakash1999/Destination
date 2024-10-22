import axios from "axios";

// Axios instance with default configuration
const api = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to fetch listings from the API
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

export default api;
