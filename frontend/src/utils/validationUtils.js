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
  return bioWordCount <= 50 || bio === ""; // Bio is optional
};
