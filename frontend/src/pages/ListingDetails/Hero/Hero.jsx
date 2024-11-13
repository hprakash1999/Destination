import PropTypes from "prop-types";

function Hero({ listing }) {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      {/* Banner listing image  */}
      <img
        src={listing.listingImage}
        alt={listing.title}
        className="w-full h-96 object-cover transition-all duration-500 transform hover:scale-110"
      />

      {/* Overlay text */}
      <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-6">
        <h2 className="text-4xl font-bold text-white">{listing.title}</h2>

        <p className="text-lg text-gray-300">{`${listing.location}, ${listing.country}`}</p>
      </div>
    </div>
  );
}

export default Hero;

// Define proptypes for validations
Hero.propTypes = {
  listing: PropTypes.shape({
    listingImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
};
