import { Schema, model } from "mongoose";

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const wordCount = value
            ? value.split(" ").filter((word) => word.length > 0).length
            : 0;

          return wordCount <= 200;
        },
        message: "Bio cannot exceed 50 words.",
      },
    },
    listingImage: {
      type: String, //Cloudinary url
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      enum: [
        "Apartment",
        "House",
        "Villa",
        "Cottage",
        "Luxury",
        "Island",
        "Castle",
        "Treehouse",
        "Cabin",
        "Tropical",
        "Lakeside",
        "Mountain",
        "Safari",
      ],
      required: true,
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    availability: {
      type: Boolean,
      default: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

export const Listing = model("Listing", listingSchema);
