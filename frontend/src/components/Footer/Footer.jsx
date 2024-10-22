// TODO: Replace advertisment cards with dynamic cards
// TODO: Replace footer's dummy content with actual links

import {
  faEnvelope,
  faTags,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { LinkButton } from "../Components.js";

function Footer() {
  const [activeSection, setActiveSection] = useState("about");

  // Section change handler for footer links
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <footer className=" text-gray-200 p-3">
      {/* Banner section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        {/* Background image */}
        <img
          src="assets/footer-banner.jpg"
          alt="Footer Banner"
          className="w-full h-full object-cover opacity-80"
        />

        {/* Advertisement cards */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 p-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Exclusive Offers Just For You!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4">
            {/* Card 1 - Discounts */}
            <div className="bg-zinc-800 bg-opacity-70 rounded-lg p-6 shadow-lg flex flex-col items-center">
              <FontAwesomeIcon
                icon={faTags}
                className="text-rose-500 text-3xl mb-2"
              />

              <h3 className="text-lg font-bold">Get 20% Off</h3>

              <p className="text-sm mb-4">
                Enjoy a special 20% discount on your first booking. Discover
                your dream holiday destination with us!
              </p>

              <LinkButton
                text="Explore Now"
                primary
                to="/explore"
                className="w-1/2"
              />
            </div>

            {/* Card 2 - Membership */}
            <div className="bg-zinc-800 bg-opacity-70 rounded-lg p-6 shadow-lg flex flex-col items-center">
              <FontAwesomeIcon
                icon={faUserPlus}
                className="text-rose-500 text-3xl mb-2"
              />

              <h3 className="text-lg font-bold">Join Our Membership</h3>

              <p className="text-sm mb-4">
                Become a member and unlock exclusive benefits, special
                discounts, and early access to promotions!
              </p>

              <LinkButton
                text="Join Now"
                primary
                to="/register"
                className="w-1/2"
              />
            </div>

            {/* Card 3 - Newsletter */}
            <div className="bg-zinc-800 bg-opacity-70 rounded-lg p-6 shadow-lg flex flex-col items-center">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-rose-500 text-3xl mb-2"
              />

              <h3 className="text-lg font-bold">Subscribe to Our Newsletter</h3>

              <p className="text-sm mb-4">
                Stay updated with our latest offers, exclusive deals, and travel
                tips right in your inbox!
              </p>

              <LinkButton text="Subscribe" primary to="#" className="w-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 mt-6 text-center">
        {["about", "contact", "privacy", "terms"].map((section) => (
          <button
            key={section}
            className={`px-4 py-2 transition duration-300 ${
              activeSection === section
                ? "font-semibold text-rose-500"
                : "text-gray-400 hover:text-rose-500"
            }`}
            onClick={() => handleSectionChange(section)}
          >
            {section.charAt(0).toUpperCase() +
              section.slice(1).replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Section Content Based on Active Section */}
      <div className="mt-6 mx-4">
        {activeSection === "about" && (
          <div>
            <h2 className="text-xl font-medium">About Us</h2>
            <p className="mt-2">
              Destination is your ideal platform for finding holiday
              accommodations...
            </p>
          </div>
        )}

        {activeSection === "contact" && (
          <div>
            <h2 className="text-xl font-medium">Contact Us</h2>
            <p className="mt-2">
              You can reach us at{" "}
              <a
                href="mailto:info@destination.com"
                className="font-semibold text-rose-500"
              >
                info@destination.com
              </a>{" "}
              or call us at 123-456-7890.
            </p>
          </div>
        )}

        {activeSection === "privacy" && (
          <div>
            <h2 className="text-xl font-medium">Privacy Policy</h2>
            <p className="mt-2">
              We value your privacy and are committed to protecting your
              personal information...
            </p>
          </div>
        )}

        {activeSection === "terms" && (
          <div>
            <h2 className="text-xl font-medium">Terms of Service</h2>
            <p className="mt-2">
              By using our services, you agree to our terms and conditions...
            </p>
          </div>
        )}
      </div>

      {/* Footer Copyright Section */}
      <div className="mt-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Destination. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
