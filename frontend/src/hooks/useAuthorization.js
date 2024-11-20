import { useSelector } from "react-redux";

const useAuthorization = () => {
  const { user } = useSelector((state) => state.auth);

  // Check if the current user has the right role
  const hasRole = (requiredRole) => {
    if (!user) return false;
    return user.role === requiredRole;
  };

  // Check if the user is owner
  const isOwner = (resourceOwnerId) => {
    if (!user) return false;
    return user._id === resourceOwnerId;
  };

  return {
    hasRole,
    isOwner,
  };
};

export default useAuthorization;
