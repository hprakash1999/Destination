import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListingCard, Loading } from "../../components/Components";
import { getAllListings } from "../../features/features.js";

function Explore() {
  const dispatch = useDispatch();

  // State for pagination
  const [page, setPage] = useState(1);
  const limit = 12;
  const [isLastPage, setIsLastPage] = useState(false);

  const { listings, status, error } = useSelector((state) => state.listings);

  // Fetch listings when page changes
  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(getAllListings({ page, limit }));

      // Check if this is the last page
      if (result.payload.length < limit) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
    };

    fetchData();
  }, [dispatch, page]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <section className="py-10 px-6 mx-auto max-w-8xl">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold text-white mb-2">
          Explore Listings
        </h2>
        <p className="text-lg text-gray-400">Find your perfect stay!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {listings && listings.length > 0 ? (
          listings.map(
            ({
              _id,
              title,
              listingImage,
              country,
              location,
              availability,
              pricePerNight,
            }) => (
              <ListingCard
                key={_id}
                title={title}
                country={country}
                location={location}
                imageURL={listingImage}
                availability={availability}
                price={pricePerNight}
                detailsLink={`/listings/${_id}`}
                className="transition-transform transform hover:scale-105"
              />
            )
          )
        ) : (
          <p className="text-center col-span-full text-gray-400">
            No listings available. Please check back later!
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        {/* Previous Button */}
        <Button
          text="Previous"
          secondary
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        />

        <span className="text-white">Page {page}</span>

        {/* Next Button */}
        <Button
          text="Next"
          secondary
          disabled={isLastPage}
          onClick={() => setPage(page + 1)}
        />
      </div>
    </section>
  );
}

export default Explore;
