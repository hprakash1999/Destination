import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file to cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) throw new Error("Invalid file path.");

    // Upload file and get response
    const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
      folder: "destination",
    });

    console.log(`File uploaded on Cloudinary. URL: ${uploadResponse.url}`);

    // Remove local file after upload
    await fs.unlink(localFilePath);
    return uploadResponse;
  } catch (err) {
    console.error("Upload failed:", err);
    try {
      // Remove local file on error
      await fs.unlink(localFilePath);
    } catch (unlinkErr) {
      console.error("Failed to remove local file:", unlinkErr);
    }
    throw err;
  }
};

export { uploadOnCloudinary };
