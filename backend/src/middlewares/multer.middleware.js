import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Helper func to format date
const formatDate = () => {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date().toLocaleDateString("en-GB", options).replace(/\s/g, "-");
};

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // Generate unique file name
    const uniqueSuffix = `${uuidv4()}-${formatDate()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueSuffix);
  },
});

// Validate only image uploads
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, JPG, PNG, and GIF are allowed."),
      false
    );
  }
};

// Set file size limit
const limits = {
  fileSize: 5 * 1024 * 1024, // 5 MB
};

export const upload = multer({
  storage,
  fileFilter,
  limits,
});
