import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function LinkButton({
  text,
  to,
  primary = false,
  secondary = false,
  className = "",
  ...props
}) {
  // Base classes for the link button
  const baseClasses =
    "px-6 py-3 rounded-lg transition-all duration-300 ease-in-out";

  // Link button variant classes
  const primaryClasses =
    "bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700";
  const secondaryClasses = "bg-gray-700 text-white hover:bg-gray-800";

  // Combine classes based on props
  const linkClasses = `${baseClasses} 
  ${primary ? primaryClasses : ""} 
  ${secondary ? secondaryClasses : ""} 
  ${className}`;

  return (
    <Link to={to} className={linkClasses} {...props}>
      {text}
    </Link>
  );
}

export default LinkButton;

// Define prop types for validation
LinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  className: PropTypes.string,
};
