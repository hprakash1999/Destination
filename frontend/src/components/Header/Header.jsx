import { Link } from "react-router-dom";
import { Button, LinkButton } from "../Components.js";

function Header() {
  return (
    <header className="bg-[#1f1f1f] text-white py-4 px-6 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-[#A57B64] hover:text-[#BC9F8B]">
            YourBrand
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6 text-lg">
          <LinkButton
            to="/"
            className="hover:text-[#A57B64] transition"
            text="Home"
          />
          <LinkButton
            to="#"
            className="hover:text-[#A57B64] transition"
            text="About"
          />
          <LinkButton
            to="#"
            className="hover:text-[#A57B64] transition"
            text="Services"
          />
          <LinkButton
            to="#"
            className="hover:text-[#A57B64] transition"
            text="Contact"
          />
        </nav>

        <div>
          <Button text="Book Now" primary className="ml-4" />
        </div>
      </div>
    </header>
  );
}

export default Header;
