import { useEffect, useState } from "react";
import {
  validateCategory,
  validateCountry,
  validateDescription,
  validateListingImage,
  validateLocation,
  validatePricePerNight,
  validateTitle,
} from "../utils/validationUtils.js";

const useListingValidation = (formData, touchedFields) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validateForm = () => {
      const {
        title,
        description,
        location,
        country,
        pricePerNight,
        category,
        listingImage,
      } = formData;
      const newErrors = {};

      if (touchedFields.title && !validateTitle(title)) {
        newErrors.title = "Title is required.";
      }
      if (touchedFields.description && !validateDescription(description)) {
        newErrors.description = "Description must be 200 words or fewer.";
      }
      if (touchedFields.location && !validateLocation(location)) {
        newErrors.location = "Location is required.";
      }
      if (touchedFields.country && !validateCountry(country)) {
        newErrors.country = "Country is required.";
      }
      if (
        touchedFields.pricePerNight &&
        !validatePricePerNight(pricePerNight)
      ) {
        newErrors.pricePerNight = "Price must be greater than 0.";
      }
      if (touchedFields.category && !validateCategory(category)) {
        newErrors.category = "Invalid category.";
      }
      if (touchedFields.listingImage && !validateListingImage(listingImage)) {
        newErrors.listingImage =
          "Listing image must be a valid image file (jpeg, png, jpg).";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    setIsFormValid(validateForm());
  }, [formData, touchedFields]);

  return { isFormValid, errors };
};

export default useListingValidation;
