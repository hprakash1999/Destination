import PropTypes from "prop-types";

function Host({ host }) {
  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-xl flex items-center space-x-6 mt-6">
      {/* User avatar */}
      <img
        src={host?.avatar || "https://www.gravatar.com/avatar/placeholder?d=mp"}
        alt={host?.fullname || "Host"}
        className="w-20 h-20 rounded-full object-cover"
      />

      <div>
        {/* User details */}
        <h3 className="text-2xl font-semibold text-white">
          {host?.fullname || "Unknown User"}
        </h3>

        <p className="text-lg text-gray-400">
          @{host?.email?.split("@")[0] || "unknown"}
        </p>

        <p className="text-gray-300 mt-2">{host?.bio || "No bio available."}</p>

        {/* Contact details - Email */}
        {host?.email && (
          <a
            href={`mailto:${host.email}`}
            className="inline-block mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Contact Host
          </a>
        )}
      </div>
    </div>
  );
}

export default Host;

// Define proptypes for validation
Host.propTypes = {
  host: PropTypes.shape({
    avatar: PropTypes.string,
    fullname: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
};
