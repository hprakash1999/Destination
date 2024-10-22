import PropTypes from "prop-types";
import { Button } from "../Components.js";

function FilterBar({ tempFilters, setTempFilters, applyFilters }) {
  // Temporary filter change handler
  const handleTempFilterChange = (e) => {
    const { name, value } = e.target;
    setTempFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Sort filter button change handler
  const handleSortChange = (e) => {
    const { name, value } = e.target;
    setTempFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Options array for filters
  const categories = [
    "Apartment",
    "Cabin",
    "Castle",
    "Cottage",
    "Island",
    "Luxury",
    "Mountain",
    "Safari",
    "Treehouse",
    "Tropical",
    "Lakeside",
  ].sort();

  const countries = [
    "Canada",
    "Fiji",
    "India",
    "Italy",
    "Mexico",
    "Netherlands",
    "Switzerland",
    "Tanzania",
    "United Kingdom",
    "United States",
    "Indonesia",
    "Thailand",
  ].sort();

  return (
    <div className="sticky top-20 bg-zinc-800 py-4 px-4 z-10 shadow-lg rounded-md h-screen">
      <div className="space-y-6">
        {/* Category Filter */}
        <div className="flex flex-col">
          <label className=" mb-2">Category:</label>

          <select
            name="category"
            value={tempFilters.category}
            onChange={handleTempFilterChange}
            className="px-2 py-1 rounded-md bg-zinc-700  text-sm"
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Country Filter */}
        <div className="flex flex-col">
          <label className=" mb-2">Country:</label>

          <select
            name="country"
            value={tempFilters.country}
            onChange={handleTempFilterChange}
            className="px-2 py-1 rounded-md bg-zinc-700  text-sm"
          >
            <option value="">All</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting filters */}
        <div className="flex flex-col">
          <label className=" mb-2">Sort by:</label>

          <select
            name="sort"
            value={tempFilters.sort}
            onChange={handleTempFilterChange}
            className="px-2 py-1 rounded-md bg-zinc-700  text-sm"
          >
            <option value="date">Date</option>
            <option value="price">Price</option>
          </select>
        </div>

        {/* Sorting order */}
        <div className="flex flex-col">
          <label className=" mb-2">Order:</label>

          <div className="space-y-2">
            {tempFilters.sort === "date" ? (
              <>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sortOrder"
                    value="desc"
                    checked={tempFilters.sortOrder === "desc"}
                    onChange={handleSortChange}
                    className="mr-2"
                  />

                  <span>Newest to Oldest</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sortOrder"
                    value="asc"
                    checked={tempFilters.sortOrder === "asc"}
                    onChange={handleSortChange}
                    className="mr-2"
                  />

                  <span>Oldest to Newest</span>
                </label>
              </>
            ) : (
              <>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sortOrder"
                    value="asc"
                    checked={tempFilters.sortOrder === "asc"}
                    onChange={handleSortChange}
                    className="mr-2"
                  />

                  <span>Low to High</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sortOrder"
                    value="desc"
                    checked={tempFilters.sortOrder === "desc"}
                    onChange={handleSortChange}
                    className="mr-2"
                  />

                  <span>High to Low</span>
                </label>
              </>
            )}
          </div>
        </div>

        {/* Search Button */}
        <Button
          text="Apply"
          primary
          onClick={applyFilters}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default FilterBar;

// Define prop types for validations
FilterBar.propTypes = {
  applyFilters: PropTypes.func.isRequired,
  tempFilters: PropTypes.object.isRequired,
  setTempFilters: PropTypes.func.isRequired,
  closeModal: PropTypes.func,
};
