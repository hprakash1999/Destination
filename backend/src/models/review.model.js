import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    isAuthor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    listing: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  },
  { timestamps: true }
);

export const Review = model("Review", reviewSchema);
