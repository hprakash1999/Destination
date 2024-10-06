import { Link } from "react-router-dom";
import { Button, LinkButton } from "../Components.js";

function Header() {
  return (
    <header className="bg-charcoal-light text-white py-4 px-6 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-cocoa-light">
            YourBrand
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6 text-lg">
          <LinkButton
            to="/"
            className="hover:text-cocoa-light transition"
            text="Home"
          />
          <LinkButton
            to="#"
            className="hover:text-cocoa-light transition"
            text="About"
          />
          <LinkButton
            to="#"
            className="hover:text-cocoa-light transition"
            text="Services"
          />
          <LinkButton
            to="#"
            className="hover:text-cocoa-light transition"
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
