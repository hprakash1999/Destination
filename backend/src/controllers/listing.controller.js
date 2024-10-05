import { Listing } from "../models/listing.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Get all listings with filters & sorting
const getAllListings = asyncHandler(async (req, res) => {
  const {
    category,
    location,
    country,
    host,
    sort = "date",
    sortOrder = "desc",
    page = 1,
    limit = 10,
  } = req.query;

  // Build the filter object
  const filter = {};

  if (category) {
    filter.category = { $regex: category, $options: "i" };
  }

  if (location) {
    filter.location = { $regex: location, $options: "i" };
  }

  if (country) {
    filter.country = { $regex: country, $options: "i" };
  }

  if (host) {
    filter.host = host; // Exact match for host
  }

  // Build the sort object
  const sortCriteria =
    sort === "price"
      ? { pricePerNight: sortOrder === "asc" ? 1 : -1 }
      : { createdAt: sortOrder === "asc" ? 1 : -1 };

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Aggregate listings
  const [listings, totalListings] = await Promise.all([
    Listing.aggregate([
      { $match: filter },
      { $sort: sortCriteria },
      { $skip: skip },
      { $limit: parseInt(limit) },
      {
        $lookup: {
          from: "users",
          localField: "host",
          foreignField: "_id",
          as: "hostInfo",
          pipeline: [{ $project: { fullname: 1, email: 1 } }],
        },
      },
      { $unwind: "$hostInfo" },
    ]),
    Listing.countDocuments(filter), // Count total listings for pagination
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        listings,
        totalListings,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalListings / limit),
      },
      "Listings retrieved successfully!"
    )
  );
});

// Add new listing
const addListing = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    location,
    country,
    pricePerNight,
    category,
    availability,
  } = req.body;

  // Check if the user is a host
  if (!req.user || req.user.role !== "host") {
    throw new ApiError(403, "You must be a host to add a listing.");
  }

  // Validate required fields
  if (
    [title, description, location, country, pricePerNight, category].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required and cannot be empty.");
  }

  // Handle listing image upload
  const listingImageLocalPath = req.file?.path;

  if (!listingImageLocalPath) {
    throw new ApiError(400, "Listing image is required!");
  }

  // Upload image to Cloudinary
  const listingImage = await uploadOnCloudinary(listingImageLocalPath);

  if (!listingImage?.url) {
    throw new ApiError(500, "Failed to upload image to Cloudinary");
  }

  // Create a new listing document in the database
  const listing = await Listing.create({
    title,
    description,
    listingImage: listingImage.url,
    location,
    country,
    pricePerNight,
    category,
    availability: availability || "true",
    host: req.user._id,
  });

  // Update the user's listings array to include the new listing ID
  await User.findByIdAndUpdate(
    req.user._id,
    { $push: { listings: listing._id } },
    { new: true }
  );

  return res
    .status(201)
    .json(new ApiResponse(201, listing, "Listing added successfully."));
});

// Get listing by ID
const getListingById = asyncHandler(async (req, res) => {
  const { listingId } = req.params;

  // Find the listing by ID
  const listing = await Listing.findById(listingId).populate(
    "host",
    "fullname email"
  );

  // Check if listing exists
  if (!listing) {
    throw new ApiError(404, "Listing not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, listing, "Listing fetched successfully!"));
});

// Update listing
const updateListing = asyncHandler(async (req, res) => {
  const { listingId } = req.params;
  const {
    title,
    description,
    location,
    country,
    pricePerNight,
    category,
    availability,
  } = req.body;

  // Validate listing ID
  if (!listingId) {
    throw new ApiError(400, "Listing ID is required!");
  }

  // Build update object with provided fields
  const updateFields = {};
  if (title) updateFields.title = title;
  if (description) updateFields.description = description;
  if (location) updateFields.location = location;
  if (country) updateFields.country = country;
  if (pricePerNight) updateFields.pricePerNight = pricePerNight;
  if (category) updateFields.category = category;

  // Handle availability, ensuring it is a Boolean
  if (availability !== undefined) {
    updateFields.availability =
      availability === "true"
        ? true
        : availability === "false"
        ? false
        : undefined;
  }

  // Handle listing image upload if provided
  if (req.file) {
    const listingImageLocalPath = req.file.path;
    const listingImage = await uploadOnCloudinary(listingImageLocalPath);

    if (!listingImage?.url) {
      throw new ApiError(500, "Failed to upload listing image!");
    }

    updateFields.listingImage = listingImage.url;
  }

  // Validate at least one field to update
  if (!Object.keys(updateFields).length) {
    throw new ApiError(400, "Please provide at least one field to update!");
  }

  // Check if the listing exists and if the logged-in user is the host
  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new ApiError(404, "Listing not found!");
  }

  if (listing.host.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this listing!");
  }

  // Update the listing
  const updatedListing = await Listing.findByIdAndUpdate(
    listingId,
    { $set: updateFields },
    {
      new: true,
      runValidators: true,
    }
  ).populate("host", "fullname email");

  if (!updatedListing) {
    throw new ApiError(500, "Failed to update listing!");
  }

  // Return updated listing
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedListing, "Listing updated successfully!")
    );
});

// Delete listings
const deleteListing = asyncHandler(async (req, res) => {
  const { listingId } = req.params;

  // Find and delete the listing
  const deletedListing = await Listing.findOneAndDelete({
    _id: listingId,
    host: req.user._id,
  });

  // Check if the listing was found and deleted
  if (!deletedListing) {
    throw new ApiError(
      404,
      "Listing not found or you are not authorized to delete it!"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Listing deleted successfully!"));
});

export {
  addListing,
  deleteListing,
  getAllListings,
  getListingById,
  updateListing,
};
