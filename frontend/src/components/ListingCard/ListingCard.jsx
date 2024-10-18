import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ListingCard({
  title,
  country,
  location,
  imageURL,
  availability,
  price,
  className = "",
  detailsLink,
}) {
  return (
    <div
      className={`bg-zinc-800 bg-opacity-70 rounded-lg shadow-lg flex flex-col ${className}`}
    >
      <img
        src={imageURL}
        alt={title}
        className="w-full h-3/4 object-cover mb-4 rounded-t-lg"
      />

      <div className="flex-grow p-4 flex flex-col">
        <Link to={detailsLink}>
          <h3 className="text-sm font-bold text-white mb-1 hover:underline">
            {title}
          </h3>
        </Link>
        <p className="text-xs text-gray-300 mb-2">{`${location}, ${country}`}</p>
        <p
          className={`text-sm font-semibold mb-4 ${
            availability ? "text-white" : "text-red-500"
          }`}
        >
          {availability ? `₹ ${price}/Night` : "Not Available"}
        </p>
      </div>
    </div>
  );
}

ListingCard.propTypes = {
  title: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  availability: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  className: PropTypes.string,
  detailsLink: PropTypes.string.isRequired,
};

export default ListingCard;
