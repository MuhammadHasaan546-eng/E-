import Product from "../../models/Product.js";
import Review from "../../models/Review.js";

export const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, message, reviewValue } = req.body;

    // Check if user already reviewed this product
    const alreadyReviewed = await Review.findOne({ productId, userId });
    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    const review = new Review({
      productId,
      userId,
      userName,
      message,
      reviewValue,
    });
    await review.save();

    // Update product average rating and total reviews
    const reviews = await Review.find({ productId });
    const totalReviews = reviews.length;
    const averageRating =
      reviews.reduce((acc, item) => item.reviewValue + acc, 0) / totalReviews;

    await Product.findByIdAndUpdate(productId, { averageRating, totalReviews });

    res
      .status(201)
      .json({ success: true, message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add review" });
  }
};

export const getProductReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const review = await Review.find({ productId });
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get review" });
  }
};
