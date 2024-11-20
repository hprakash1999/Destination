import api from "./api.js";

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
