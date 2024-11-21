import PropTypes from "prop-types";
import { Button, LinkButton } from "../../../components/Components.js";
import useAuthorization from "../../../hooks/useAuthorization";

function ListingActions({ listing }) {
  const { isOwner } = useAuthorization();

  // Check if the current user is the owner of this listing
  const isListingOwner = isOwner(listing.host._id);

  // Delete listing handler
  const handleDelete = () => {
    alert(`Listing deleted successfully!`);
  };

  return (
    <div className="flex justify-center space-x-4">
      {/* Conditionally show buttons based on authorization */}
      {isListingOwner && (
        <>
          <LinkButton
            text="Edit"
            to={`/explore/${listing._id}/edit`}
            primary
            className="px-24 mx-4"
          />
          <Button
            text="Delete"
            secondary
            onClick={handleDelete}
            className="px-24 mx-4"
          />
        </>
      )}
    </div>
  );
}

export default ListingActions;

// Define propTypes for validations
ListingActions.propTypes = {
  listing: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    host: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
