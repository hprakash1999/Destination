import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import { refreshAccessToken } from "../features/features.js";

const useAuth = () => {
  const dispatch = useDispatch();

  // Get auth state from Redux store
  const { accessToken, user, isLoading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Try to refresh the access token if it's missing or expired
    const refreshToken = async () => {
      if (!accessToken) {
        try {
          await dispatch(refreshAccessToken()).unwrap(); // Refresh token
        } catch (err) {
          dispatch(logout()); // Logout if token refresh fails
          console.error("Failed to refresh token:", err);
        }
      }
    };

    refreshToken();
  }, [accessToken, dispatch]);

  return {
    user,
    isLoading,
    error,
    accessToken,
    logout: () => dispatch(logout()), // Logout action
  };
};

export default useAuth;
