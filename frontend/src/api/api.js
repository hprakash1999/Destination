import axios from "axios";

// Axios instance with default configuration
const api = axios.create({
  baseURL: "http://localhost:5001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
