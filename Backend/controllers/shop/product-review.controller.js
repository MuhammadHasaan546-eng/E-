import Review from "../../models/Review.js";

export const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, message, reviewValue } = req.body;
    const review = new Review({
      productId,
      userId,
      userName,
      message,
      reviewValue,
    });
    await review.save();
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
