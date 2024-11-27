import { Listing } from "../models/listing.model.js";
import { Review } from "../models/review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get all reviews of a listing
const getListingReviews = asyncHandler(async (req, res) => {
  const { listingId } = req.params;

  // Check if the listing exists
  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new ApiError(404, "Listing not found!");
  }

  // Get reviews for the listing
  const reviews = await Review.find({ listing: listingId })
    .populate("isAuthor", "fullname email")
    .exec();

  return res
    .status(200)
    .json(new ApiResponse(200, reviews, "Reviews retrieved successfully!"));
});

// Get review by ID
const getReviewById = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  // Find the review by listingId and reviewId
  const review = await Review.findOne({ _id: reviewId })
    .populate("isAuthor", "fullname email")
    .exec();

  // Check if the review exists
  if (!review) {
    throw new ApiError(404, "Review not found for this listing!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, review, "Review retrieved successfully!"));
});

// Create review
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const { listingId } = req.params;

  // Validate fields
  if (!rating || !comment) {
    throw new ApiError(400, "Rating and comment are required!");
  }

  if (rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating must be between 1 and 5!");
  }

  // Check if the listing exists
  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new ApiError(404, "Listing not found!");
  }

  // Create the review
  const review = await Review.create({
    rating,
    comment,
    isAuthor: req.user._id,
    listing: listingId,
  });

  // Update the listing's reviews array
  await Listing.findByIdAndUpdate(
    listingId,
    { $push: { reviews: review._id } },
    { new: true }
  );

  // Populate the review after creation
  const populatedReview = await Review.findById(review._id)
    .populate("isAuthor", "fullname email") // Populate author fields
    .populate("listing", "title"); // Populate listing fields

  // Fetch the listing with reviews populated
  const populatedListing = await Listing.findById(listingId)
    .populate("host", "fullname email bio username")
    .populate({
      path: "reviews", // Populate reviews
      populate: {
        path: "isAuthor",
        select: "fullname email",
      },
    });

  return res
    .status(201)
    .json(new ApiResponse(201, populatedListing, "Review added successfully!"));
});

// Update review
const updateReviewById = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  // Validate input
  if (!(rating || comment)) {
    throw new ApiError(400, "Please provide at least one field to update!");
  }

  // Build the update object with provided fields
  const updateFields = {};
  if (rating) updateFields.rating = rating;
  if (comment) updateFields.comment = comment;

  // Find the review and check if the user is authorized to update it
  const review = await Review.findOne({
    _id: reviewId,
    isAuthor: req.user._id,
  });

  // Check if the review exists
  if (!review) {
    throw new ApiError(
      404,
      "Review not found or you are not authorized to update it!"
    );
  }

  // Update the review fields
  Object.assign(review, updateFields);
  await review.save();

  return res
    .status(200)
    .json(new ApiResponse(200, review, "Review updated successfully!"));
});

// Delete review
const deleteReviewById = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  // Find the review and check if the user is the author
  const review = await Review.findOne({
    _id: reviewId,
    isAuthor: req.user._id,
  });

  // Check if the review exists and if the user is the author
  if (!review) {
    throw new ApiError(
      404,
      "Review not found or you are not authorized to delete it!"
    );
  }

  // Delete the review
  await Review.findByIdAndDelete(reviewId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Review deleted successfully!"));
});

export {
  createReview,
  deleteReviewById,
  getListingReviews,
  getReviewById,
  updateReviewById,
};
