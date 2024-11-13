import { useEffect, useState } from "react";
import { getUserById } from "../api/api.js";

function useGetUser(userId) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  // Fetch user details from API
  useEffect(() => {
    if (!userId) return; // Skip if no userId is provided

    const fetchUserDetails = async () => {
      setStatus("loading");
      try {
        const response = await getUserById(userId);
        setUser(response);
        setStatus("success");
      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to fetch user details"
        );
        setStatus("failed");
      }
    };

    fetchUserDetails();
  }, [userId]);

  return { user, status, error };
}

export default useGetUser;
