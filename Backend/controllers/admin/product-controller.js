import { imageUploadUtlls } from "../../config/cloudinary.js";
import Product from "../../models/Product.js";

export const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtlls(url);

    res.json({
      success: true,
      message: "Image uploaded successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while uploading image",
    });
  }
};

//  ADD  New Product
export const addNewProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      category,
      brand,
      stock,
      price,
      salePrice,
    } = req.body;

    const newProduct = new Product({
      title,
      description,
      image,
      category,
      brand,
      stock,
      price,
      salePrice,
    });
    await newProduct.save();

    res.status(200).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while adding new product",
    });
  }
};
// Fetch ALL Products
export const fetchAllProduct = async (req, res) => {
  try {
    const listOfData = await Product.find();
    res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      data: listOfData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "fetching all products failed",
    });
  }
};

// edit Product
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      image,
      category,
      brand,
      stock,
      price,
      salePrice,
    } = req.body;
    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.stock = stock || findProduct.stock;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: findProduct,
    });

    // const updatedProduct = {
    //   ...findProduct,
    //   title,
    //   description,
    //   image,
    //   category,
    //   brand,
    //   stock,
    //   price,
    //   salePrice,
    // };
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "editing product failed",
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      // data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Delete product failed",
    });
  }
};
