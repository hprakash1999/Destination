import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FilterBar,
  ListingCard,
  Loading,
} from "../../components/Components";
import { getAllListings } from "../../features/features.js";

function Explore() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 12;

  // State for filters used in API requests
  const [filters, setFilters] = useState({
    category: "",
    country: "",
    sort: "date",
    sortOrder: "desc",
  });

  // Temporary state for filters before applying
  const [tempFilters, setTempFilters] = useState({
    category: "",
    country: "",
    sort: "date",
    sortOrder: "desc",
  });

  const { listings, status, error, totalListings } = useSelector(
    (state) => state.listings
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllListings({ page, limit, ...filters }));
    };
    fetchData();
  }, [dispatch, page, filters]);

  // Conditional rendering based on status
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Calculate total pages
  const totalPages = Math.ceil(totalListings / limit);

  // Apply filters handler
  const applyFilters = () => {
    setFilters(tempFilters);
    setPage(1); // Reset page to 1
  };

  return (
    <section className="py-10 px-6 mx-auto max-w-8xl">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold text-white mb-2">
          Explore Listings
        </h2>

        <p className="text-lg text-gray-400">Find your perfect stay!</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar FilterBar */}
        <div className="w-1/5">
          <FilterBar
            tempFilters={tempFilters}
            setTempFilters={setTempFilters}
            applyFilters={applyFilters}
          />
        </div>

        {/* Listings Cards */}
        <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            text={index + 1}
            className={`${
              page === index + 1
                ? "bg-rose-500 text-white"
                : "bg-gray-600 text-gray-300"
            } px-4 py-2 rounded`}
            onClick={() => setPage(index + 1)}
          />
        ))}
      </div>
    </section>
  );
}

export default Explore;
