import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Establish MongoDB connection
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI and database name
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MongoDB connected successfully! Host: ${connection.connection.host}`
    );
  } catch (err) {
    // Log error and exit process if connection fails
    console.error(`MongoDB connection failed. ERROR: ${err}`);
    process.exit(1); // Exit with failure code
  }
};

export { connectDB };
