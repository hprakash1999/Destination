import PropTypes from "prop-types";

function Button({
  text,
  primary = false,
  className = "",
  disabled = false,
  ...props
}) {
  // Base classes for the button
  const baseClasses = "px-6 py-3 rounded-lg transition duration-200";
  const primaryClasses = " bg-cocoa-dark text-white hover:bg-cocoa-medium";
  const disabledClasses = "bg-gray-600 cursor-not-allowed";

  // Combine classes based on props
  const buttonClasses = `${baseClasses} ${primary ? primaryClasses : ""} 
  ${disabled ? disabledClasses : ""} ${className}`;

  return (
    <button className={buttonClasses} disabled={disabled} {...props}>
      {text}
    </button>
  );
}

export default Button;

// Define prop types for validations
Button.propTypes = {
  text: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
