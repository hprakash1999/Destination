import PropTypes from "prop-types";

function Description({ listing }) {
  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl text-white font-semibold mb-3">Description</h3>
      <p className="text-lg text-gray-300 mb-6">{listing.description}</p>

      {/* Price */}
      <p className="text-2xl text-white mb-4">
        ₹ {listing.pricePerNight} <span className="text-xl">/ Night</span>
      </p>

      {/* Category and Availability */}
      <div className="flex justify-between items-center text-white mt-4">
        <div className="flex space-x-4">
          <div className="px-4 py-2 bg-zinc-700 rounded-full text-lg text-white">
            {listing.category}
          </div>

          <div
            className={`px-4 py-2 rounded-full text-lg ${
              listing.availability ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {listing.availability ? "Available" : "Not Available"}
          </div>
        </div>

        {/* Created At & Updated At */}
        <div className="flex space-x-4 text-white text-sm">
          <div className="bg-zinc-700 px-4 py-2 rounded-full">
            Created: {new Date(listing.createdAt).toLocaleDateString()}
          </div>

          {listing.updatedAt && (
            <div className="bg-zinc-700 px-4 py-2 rounded-full">
              Updated: {new Date(listing.updatedAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Description;

// Define proptypes for validations
Description.propTypes = {
  listing: PropTypes.shape({
    description: PropTypes.string.isRequired,
    pricePerNight: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    availability: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string,
  }).isRequired,
};
