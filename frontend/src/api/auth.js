import api from "./api.js";

// Function to login user
export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/user/login", loginData, {
      withCredentials: true,
    });

    console.log("Login successful:", response.data);

    return {
      user: response.data.data.user,
      accessToken: response.data.data.accessToken,
    };
  } catch (err) {
    console.log("Login failed:", err);
    throw err;
  }
};

// Function to logout user
export const logoutUser = async () => {
  return await api.post("/user/logout");
};

// Function to refresh access token
export const refreshAccessToken = async () => {
  try {
    const response = await api.post(
      "/user/refresh-token",
      {},
      { withCredentials: true }
    );
    return response.data.data.accessToken;
  } catch (err) {
    console.log("Failed to refresh access token:", err);
    throw err;
  }
};
