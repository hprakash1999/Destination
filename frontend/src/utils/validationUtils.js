// User validation utils
export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  return usernameRegex.test(username);
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateBio = (bio) => {
  const bioWordCount = bio.split(" ").filter((word) => word.length > 0).length;
  return bioWordCount <= 50 || bio === "";
};

// Listing validation utils
export const validateTitle = (title) => {
  return title && title.trim().length > 0;
};

export const validateDescription = (description) => {
  const wordCount = description
    .split(" ")
    .filter((word) => word.length > 0).length;
  return wordCount <= 200; // Description cannot exceed 200 words
};

export const validateLocation = (location) => {
  return location && location.trim().length > 0;
};

export const validateCountry = (country) => {
  return country && country.trim().length > 0;
};

export const validatePricePerNight = (price) => {
  return price > 0; // Price per night must be positive
};

export const validateCategory = (category) => {
  const validCategories = [
    "Apartment",
    "House",
    "Villa",
    "Cottage",
    "Luxury",
    "Island",
    "Castle",
    "Treehouse",
    "Cabin",
    "Tropical",
    "Lakeside",
    "Mountain",
    "Safari",
  ];
  return validCategories.includes(category);
};

export const validateListingImage = (file) => {
  if (!file) return false;
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  return allowedTypes.includes(file.type);
};
