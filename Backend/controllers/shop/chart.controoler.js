import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

export const addChart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await new Cart({ userId, items: [] });
    }
    const findCurrentProduct = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );
    if (findCurrentProduct !== -1) {
      cart.items[findCurrentProduct].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const fetchChartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "title price salePrice image ",
    });
    if (!cart) {
      return res.status(200).json({
        success: true,
        data: {
          items: [],
        },
      });
    }

    const validCartItems = cart.items.filter((item) => item.productId);
    if (validCartItems.length < cart.items.length) {
      cart.items = validCartItems;
      await cart.save();
    }
    const populateCartItem = validCartItems.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      image: item.productId.image,
      title: item.productId.title,
    }));

    return res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      data: {
        ...cart._doc,
        items: populateCartItem,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateChartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
      });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const findCurrentProduct = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );
    if (findCurrentProduct === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }
    cart.items[findCurrentProduct].quantity = quantity;
    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "title price salePrice image ",
    });

    const populateCartItem = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      quantity: item.quantity,
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : null,
    }));

    return res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: {
        ...cart._doc,
        items: populateCartItem,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteChartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
      });
    }
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "title price salePrice image ",
    });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId,
    );
    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "title price salePrice image ",
    });

    const populateCartItem = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      quantity: item.quantity,
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : null,
    }));

    return res.status(200).json({
      success: true,
      message: "Cart item deleted successfully",
      data: {
        ...cart._doc,
        items: populateCartItem,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
