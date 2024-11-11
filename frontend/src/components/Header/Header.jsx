import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LinkButton, LogoutButton } from "../Components.js";

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <nav className="bg-zinc-800 text-white py-4 px-6 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold">
          <Link to="/">destination</Link>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-6">
          <LinkButton
            to="/explore"
            text="Explore Listings"
            className="text-white bg-gradient-to-r hover:from-rose-600 hover:to-pink-700"
          />

          {/* User Login or Avatar */}
          {user ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center">
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-md shadow-lg z-10">
                  <div className="p-2">
                    <p className="text-gray-200">{user.name}</p>{" "}
                    <Link
                      to="/profile"
                      className="block text-gray-300 hover:bg-zinc-700 p-2 rounded-md"
                    >
                      Visit Profile
                    </Link>
                    <LogoutButton />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <LinkButton
              to="/in"
              text="Login"
              className="text:white hover:text-rose-500 hover:underline"
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
