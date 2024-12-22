import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchListingById } from "../../api/listings.js";
import { Loading } from "../../components/Components.js";
import Description from "./Description/Description.jsx";
import Hero from "./Hero/Hero.jsx";
import Host from "./Host/Host.jsx";
import ListingActions from "./ListingActions/ListingActions.jsx";
import Reviews from "./Reviews/Reviews.jsx";

function ListingDetails() {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  // Fetch listing details from API
  useEffect(() => {
    const getListingDetails = async () => {
      setStatus("loading");
      try {
        const response = await fetchListingById(listingId);
        setListing(response);
        setStatus("success");
      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to fetch listing details"
        );
        setStatus("failed");
      }
    };

    getListingDetails();
  }, [listingId]);

  // Conditional rendering based on status
  if (status === "loading") {
    return (
      <div className="text-center text-white">
        <Loading />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center text-red-500">
        Error: {error} - Please try again later.
      </div>
    );
  }

  // If listing not found
  if (!listing) {
    return (
      <div className="text-center text-red-500">
        Listing not found. Please go back and try again.
      </div>
    );
  }

  return (
    <section className="container mx-auto py-10 px-6 space-y-8">
      <Hero listing={listing} />
      <Description listing={listing} />
      <ListingActions listing={listing} />
      <Host host={listing.host} />
      <Reviews reviews={listing.reviews} />
    </section>
  );
}

export default ListingDetails;
