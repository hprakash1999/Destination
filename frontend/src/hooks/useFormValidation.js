import { useEffect, useState } from "react";
import {
  validateBio,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utils/validationUtils.js";

const useFormValidation = (formData, touchedFields) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validateForm = () => {
      const { fullname, username, email, bio, password, avatar } = formData;
      const newErrors = {};

      if (touchedFields.fullname && !fullname.trim())
        newErrors.fullname = "Full name is required.";
      if (touchedFields.username && !validateUsername(username))
        newErrors.username = "Invalid username.";
      if (touchedFields.email && !validateEmail(email))
        newErrors.email = "Invalid email address.";
      if (touchedFields.bio && !validateBio(bio))
        newErrors.bio = "Bio must be 50 words or less.";
      if (touchedFields.password && !validatePassword(password))
        newErrors.password = "Password must be at least 8 characters.";
      if (touchedFields.avatar && !avatar)
        newErrors.avatar = "Avatar is required.";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // Form is valid if there are no errors
    };

    setIsFormValid(validateForm());
  }, [formData, touchedFields]);

  return { isFormValid, errors };
};

export default useFormValidation;
