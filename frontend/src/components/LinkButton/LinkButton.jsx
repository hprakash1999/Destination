import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LinkButton = ({
  text,
  to,
  primary = false,
  className = "",
  ...props
}) => {
  // Base classes for the link button
  const baseClasses = "px-6 py-3 rounded-lg transition duration-200";
  const primaryClasses = "bg-[#A57B64] text-white hover:bg-[#BC9F8B]";

  // Combine classes based on props
  const linkClasses = `${baseClasses} 
  ${primary ? primaryClasses : ""} ${className}`;

  return (
    <Link to={to} className={linkClasses} {...props}>
      {text}
    </Link>
  );
};

export default LinkButton;

// Define prop types for validations
LinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  primary: PropTypes.bool,
};
