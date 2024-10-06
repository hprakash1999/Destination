import { Carousel, LinkButton } from "../../../components/Components";

const Hero = () => {
  return (
    <div className="relative h-96 overflow-hidden">
      <Carousel />

      {/* Text section */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50 p-6">
        <h1 className="text-4xl font-bold mb-4">
          Start Your Next Adventure with Us
        </h1>
        <p className="mb-6 max-w-2xl">
          Escape the everyday hustle and enjoy a stay in our comfortable
          accommodations, designed to help you relax and recharge.
        </p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <LinkButton text="Explore Now" primary to="/explore" />
          <LinkButton
            text="Join Us Today"
            to="/signup"
            className="hover:bg-cocoa-dark"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
