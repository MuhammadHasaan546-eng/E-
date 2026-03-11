import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

// import routes

import adminProductsRoutes from "./routes/admin/product-routes.js";
import shopProductsRoutes from "./routes/shop/product.router.js";
import authRoute from "./routes/auth/auth-router.js";
import cartRoute from "./routes/shop/chart.router.js";
import shopAddressRoute from "./routes/shop/address-routes.js";
import shopOrderRouter from "./routes/shop/order-routes.js";
import adminOrderRouter from "./routes/admin/admin-order.routes.js";
import searchRouter from "./routes/shop/search.route.js";
import reviewRouter from "./routes/shop/review.route.js";
import commontFeatures from "./routes/common/feature.router.js";

const app = express();

const PORT = process.env.PORT || 5000;

// Create database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(error));

// CORS
app.use(
  cors({
    origin: [process.env.REACT_VITE_URL, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  }),
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/admin/products", adminProductsRoutes);
app.use("/api/shop/products", shopProductsRoutes);
app.use("/api/shop/cart", cartRoute);
app.use("/api/shop/address", shopAddressRoute);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/search", searchRouter);
app.use("/api/shop/review", reviewRouter);

app.use("/api/common/feature", commontFeatures);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
