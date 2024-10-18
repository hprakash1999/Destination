import {
  faDumbbell,
  faParking,
  faSpa,
  faSwimmingPool,
  faUtensils,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Facilities() {
  const facilities = [
    {
      icon: faWifi,
      title: "Free Wi-Fi",
      description: "Stay connected with our complimentary high-speed internet.",
    },
    {
      icon: faParking,
      title: "Free Parking",
      description: "Enjoy convenient and secure parking facilities.",
    },
    {
      icon: faUtensils,
      title: "Dining",
      description: "Savor delicious meals at our on-site restaurant.",
    },
    {
      icon: faSwimmingPool,
      title: "Swimming Pool",
      description: "Relax and unwind in our beautiful swimming pool.",
    },
    {
      icon: faSpa,
      title: "Spa Services",
      description: "Pamper yourself with our relaxing spa treatments.",
    },
    {
      icon: faDumbbell,
      title: "Fitness Center",
      description: "Stay active with our state-of-the-art gym facilities.",
    },
  ];

  return (
    <div className="py-10 px-6">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-5">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-zinc-800 p-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105"
            >
              <div className="text-4xl text-rose-500 mb-4">
                <FontAwesomeIcon icon={facility.icon} />
              </div>

              <h3 className="text-xl font-semibold mb-2 text-white">
                {facility.title}
              </h3>

              <p className="text-gray-400">{facility.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Facilities;
