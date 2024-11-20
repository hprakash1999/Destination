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
    return user.id === resourceOwnerId;
  };

  // Check if the user has permission for a specific action
  const isAuthorized = (resourceOwnerId, action) => {
    if (!user) return false;

    switch (action) {
      case "update":
      case "delete":
        return isOwner(resourceOwnerId);
      case "create":
        return hasRole("host");
      case "view":
        return true;
      default:
        return false;
    }
  };

  return {
    hasRole,
    isOwner,
    isAuthorized,
  };
};

export default useAuthorization;
