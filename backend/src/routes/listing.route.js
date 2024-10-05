import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewre.js";
import { upload } from "../middlewares/multer.middleware.js";

// Import controllers
import {
  addListing,
  deleteListing,
  getAllListings,
  getListingById,
  updateListing,
} from "../controllers/listing.controller.js";

const router = Router();

// home routes
router
  .route("/")
  .get(getAllListings)
  .post(verifyJwt, upload.single("listingImage"), addListing);

// CRUD routes
router
  .route("/:listingId")
  .get(getListingById)
  .patch(verifyJwt, upload.single("listingImage"), updateListing)
  .delete(verifyJwt, deleteListing);

export default router;
