import { useCallback, useEffect, useState } from "react";

function Carousel() {
  // Slides with customer's image
  const slides = [
    { url: "assets/customer-1.jpg", title: "Customer 1" },
    { url: "assets/customer-2.jpg", title: "Customer 2" },
    { url: "assets/customer-3.jpg", title: "Customer 3" },
    { url: "assets/customer-4.jpg", title: "Customer 4" },
    { url: "assets/customer-5.jpg", title: "Customer 5" },
    { url: "assets/customer-6.jpg", title: "Customer 6" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState(false);
  const slideInterval = 3000;

  // Memoize to avoid unnecessary re-renders
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Change slides every "slideInterval" seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, slideInterval);
    return () => clearInterval(interval);
  }, [nextSlide, slideInterval]);

  // Handle image error
  const handleImageError = () => {
    setError(true);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.url}
            alt={slide.title}
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Error message */}
      {error && (
        <p className="absolute text-red-500 bottom-4 left-1/2 transform -translate-x-1/2 bg-zinc-800 p-2 rounded">
          Image failed to load
        </p>
      )}
    </div>
  );
}

export default Carousel;
