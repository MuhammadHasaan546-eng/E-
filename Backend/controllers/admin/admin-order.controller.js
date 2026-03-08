import Order from "../../models/Order.js";
import ExpressError from "../../utils/ExpressError.js";

export const getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ orderDate: -1 });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    throw new ExpressError(500, "Internal Server Error", false);
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      throw new ExpressError(404, "Order not found!");
    }

    order.orderStatus = orderStatus;
    order.orderUpdateDate = new Date();
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    throw new ExpressError(404, "Some error occurred!", false);
  }
};
