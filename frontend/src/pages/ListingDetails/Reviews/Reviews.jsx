import PropTypes from "prop-types";

function ReviewSection({ reviews }) {
  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-lg mt-6">
      <h3 className="text-2xl text-white font-semibold mb-3">Reviews</h3>

      {reviews.length === 0 ? (
        <p className="text-lg text-gray-300">
          No reviews yet. Be the first to leave a review!
        </p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="flex space-x-4 mb-6 border-b-2 pb-4">
            {/* User Avatar */}
            <img
              src={review.isAuthor.avatar}
              alt={review.isAuthor.fullname}
              className="w-12 h-12 rounded-full object-cover"
            />

            {/* Review Content */}
            <div className="flex-1">
              {/* User Info */}
              <div className="flex items-center mb-2">
                <span className="text-lg text-white font-semibold">
                  {review.isAuthor.fullname}
                </span>
                <span className="text-sm text-gray-300 ml-2">
                  @{review.isAuthor.username}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-2">
                <span className="text-yellow-400">
                  {"★".repeat(review.rating)}
                </span>
                <span className="text-gray-300 ml-2">{review.rating} / 5</span>
              </div>

              {/* Comment */}
              <p className="text-lg text-gray-300">{review.comment}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewSection;

// Define prop types for validation
ReviewSection.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
      isAuthor: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        fullname: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
