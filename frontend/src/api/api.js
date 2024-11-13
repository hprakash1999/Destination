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

// Function to register new user
export const registerNewUser = async (registerData) => {
  try {
    // Create a FormData object to send files
    const formData = new FormData();
    // Append fields to FormData
    Object.keys(registerData).forEach((key) => {
      formData.append(key, registerData[key]);
    });

    const response = await api.post("/user/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("User registered:", response.data);

    return response.data.data;
  } catch (err) {
    console.log("Failed to register user:", err);
    throw err;
  }
};

// Function to login user
export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/user/login", loginData, {
      withCredentials: true, // Ensure cookies are sent for authentication
    });

    console.log("Login successful:", response.data);

    return {
      user: response.data.data.user,
      refreshToken: response.data.data.refreshToken,
      accessToken: response.data.data.accessToken,
    };
  } catch (err) {
    console.log("Login failed:", err);
    throw err; // Throws error to be caught by the thunk
  }
};

// Function to logout user
export const logoutUser = async () => {
  return await api.post("/user/logout");
};

// Function to get user by ID
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/user/${userId}`);

    console.log("User details fetched:", response.data);

    return response.data.data;
  } catch (err) {
    console.error("Failed to fetch user details:", err);
    throw err;
  }
};

export default api;
