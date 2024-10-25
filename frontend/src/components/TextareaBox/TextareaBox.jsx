import PropTypes from "prop-types";

const TextareaBox = ({
  label,
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
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`w-full px-4 py-3 text-zinc-100 bg-zinc-800 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent placeholder-zinc-500 resize-none ${className}`}
        rows={4} // Adjust the number of rows as needed
        {...props}
      />
    </div>
  );
};

TextareaBox.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default TextareaBox;
