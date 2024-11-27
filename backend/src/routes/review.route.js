import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewre.js";

// Import controllers
import {
  createReview,
  deleteReviewById,
  getListingReviews,
  getReviewById,
  updateReviewById,
} from "../controllers/review.controller.js";

const router = Router();

// Home routes
router
  .route("/:listingId/reviews")
  .get(getListingReviews)
  .post(verifyJwt, createReview);

// CRUD routes
router
  .route("/reviews/:reviewId")
  .get(getReviewById)
  .patch(verifyJwt, updateReviewById)
  .delete(verifyJwt, deleteReviewById);

export default router;
