import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutCurrentUser } from "../../features/features.js";
import Button from "../Components.js";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = async () => {
    try {
      await dispatch(logoutCurrentUser());
      navigate("/in");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return <Button text="Logout" secondary onClick={handleLogout} />;
}

export default LogoutButton;
