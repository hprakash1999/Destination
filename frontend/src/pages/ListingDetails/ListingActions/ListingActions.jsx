import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteListing } from "../../../api/listings.js";
import { Button, LinkButton } from "../../../components/Components.js";
import useAuthorization from "../../../hooks/useAuthorization";

function ListingActions({ listing }) {
  const { isOwner } = useAuthorization();
  const navigate = useNavigate();

  // Check if the current user is the owner of this listing
  const isListingOwner = isOwner(listing.host._id);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!listing || !listing._id) {
      console.error("Invalid listing or listing ID");
      alert("Invalid listing. Please refresh the page and try again.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await deleteListing(listing._id);
      alert("Listing deleted successfully!");
      navigate("/explore");
    } catch (error) {
      console.error("Failed to delete listing:", error);
      alert("Failed to delete the listing. Please try again later.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex justify-center space-x-4">
      {isListingOwner && (
        <>
          <LinkButton
            text="Edit"
            to={`/explore/${listing._id}/edit`}
            primary
            className="px-24 mx-4"
          />
          <Button
            text={isDeleting ? "Deleting..." : "Delete"}
            secondary
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-24 mx-4"
          />
        </>
      )}
    </div>
  );
}

export default ListingActions;

// Define propTypes for validation
ListingActions.propTypes = {
  listing: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    host: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
