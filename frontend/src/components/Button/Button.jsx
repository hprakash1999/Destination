import PropTypes from "prop-types";

function Button({
  text,
  primary = false,
  secondary = false,
  className = "",
  disabled = false,
  ...props
}) {
  // Base classes for the button
  const baseClasses =
    "px-6 py-3 rounded-lg transition-all duration-300 ease-in-out";

  // Button variant classes
  const primaryClasses =
    "bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700";
  const secondaryClasses = "bg-gray-700 text-white hover:bg-gray-800";

  // Disabled button classes
  const disabledClasses = "cursor-not-allowed opacity-50";

  // Combine classes based on props
  const buttonClasses = `${baseClasses} ${
    primary ? primaryClasses : secondary ? secondaryClasses : ""
  } ${disabled ? disabledClasses : ""} ${className}`;

  return (
    <button className={buttonClasses} disabled={disabled} {...props}>
      {text}
    </button>
  );
}

export default Button;

// Define prop types for validations
Button.propTypes = {
  text: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
