import axios from "axios";

// Axios instance with default configuration
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
