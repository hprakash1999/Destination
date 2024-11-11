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

  // Scroll to the top of the page
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link to={to} className={linkClasses} onClick={handleClick} {...props}>
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
