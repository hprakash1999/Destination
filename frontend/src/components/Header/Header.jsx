import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAuthorization from "../../hooks/useAuthorization.js";
import { LinkButton, LogoutButton } from "../Components.js";

function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const { hasRole } = useAuthorization();
  const isHost = hasRole("host");

  const user = useSelector((state) => state.auth.user);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Extract user's first name
  const getFirstName = (fullName) => fullName?.split(" ")[0] || "";

  return (
    <nav className="bg-zinc-800 text-white py-4 px-6 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold tracking-wide">
          <Link to="/">destination</Link>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-6">
          <LinkButton to="/explore" text="Explore Listings" primary />

          {/* User Login or Avatar */}
          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border-2 border-rose-500 hover:scale-105 transition duration-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full border-2 border-rose-500 bg-rose-600 text-white flex items-center justify-center text-lg font-bold">
                    {user.fullname[0]?.toUpperCase()}
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-2 w-64 bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 transform transition-all duration-200 ease-in-out ${
                  isDropdownOpen
                    ? "scale-100 opacity-100 translate-y-0"
                    : "scale-95 opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="p-4">
                  {/* Greeting */}
                  <div className="mb-3">
                    <p className="text-lg font-semibold text-gray-200">
                      Hi, {getFirstName(user.fullname)}!
                    </p>
                    <p className="text-sm text-gray-400">@{user.username}</p>
                  </div>

                  <hr className="my-3 border-zinc-700" />

                  {/* Actions */}
                  <div className="space-y-2">
                    {isHost && (
                      <Link
                        to="/listing/new"
                        className="block text-gray-300 hover:text-rose-500 hover:bg-zinc-700 p-2 rounded-lg transition duration-150"
                      >
                        Add New Listing
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      className="block text-gray-300 hover:text-rose-500 hover:bg-zinc-700 p-2 rounded-lg transition duration-150"
                    >
                      Visit Profile
                    </Link>
                  </div>

                  <hr className="my-3 border-zinc-700" />

                  {/* Logout */}
                  <div>
                    <LogoutButton className="w-full text-left text-gray-300 hover:text-red-500 hover:bg-zinc-700 p-2 rounded-lg transition duration-150" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <LinkButton
              to="/in"
              text="Login"
              className="text-white hover:text-rose-500 underline-offset-2 hover:underline transition duration-150"
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
