import PropTypes from "prop-types";

const InputBox = ({
  label,
  type = "text",
  placeholder,
  value,
  name,
  className = "",
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-zinc-200 text-sm font-medium mb-2"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`w-full px-4 py-3 text-zinc-100 bg-zinc-800 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent placeholder-zinc-500 ${className}`}
        {...props}
      />
    </div>
  );
};

InputBox.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default InputBox;
