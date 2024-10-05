import { Link } from "react-router-dom";

const Button = ({
  text,
  primary = false,
  className = "",
  disabled = false,
  to,
  ...props
}) => {
  // Base classes for the button
  const baseClasses = "w-full px-6 py-3 rounded-lg transition duration-200";
  const primaryClasses = "bg-[#A57B64] text-white hover:bg-[#BC9F8B]";
  const disabledClasses = "bg-gray-600 cursor-not-allowed";

  // Combine classes based on props
  const buttonClasses = `${baseClasses} ${primary ? primaryClasses : ""} ${
    disabled ? disabledClasses : ""
  } ${className}`;

  // Render button or link
  return to ? (
    <Link to={to} className="w-full">
      <button className={buttonClasses} disabled={disabled} {...props}>
        {text}
      </button>
    </Link>
  ) : (
    <button className={buttonClasses} disabled={disabled} {...props}>
      {text}
    </button>
  );
};

export default Button;
