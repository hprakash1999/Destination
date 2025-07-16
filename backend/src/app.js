import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

// Configuring CORS
app.use(cors({ origin: `${process.env.CORS_ORIGIN}`, credentials: true }));

// Configuring Express
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));

app.use(cookieParser());

// Import routes
import listingRouter from "./routes/listing.route.js";
import reviewRouter from "./routes/review.route.js";
import userRouter from "./routes/user.route.js";

// Routes declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/listings", listingRouter);
app.use("/api/v1", reviewRouter);

export { app };
