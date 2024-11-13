// TODO: Replace footer's dummy content with actual links

import { useState } from "react";

function Footer() {
  const [activeSection, setActiveSection] = useState("about");

  // Section change handler for footer links
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <footer className=" text-gray-200 p-3">
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
