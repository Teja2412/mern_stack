const Product = require("../models/product");
const mongoose = require("mongoose");

// Create project functionality
const addProduct = async (req, res) => {
  try {
    if (!req.body.name || !req.body.price || !req.body.quantity) {
      return res
        .status(400)
        .json({ message: "All fields are required: name, price, quantity" });
    }
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Something went wrong! :- ${error.message}` });
  }
};

// Get all products functionality
const getAllProducts = async (req, res) => {
  try {
    const getAllProducts = await Product.find({});
    if (getAllProducts.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    console.log("products", getAllProducts?.length, getAllProducts);
    res
      .status(200)
      .json({ data: getAllProducts, length: getAllProducts?.length });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Something went wrong! :- ${error.message}` });
  }
};

// Get particular product details functionality
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const getProductDetails = await Product.findOne({ _id: id });
    if (!getProductDetails) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(getProductDetails);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Something went wrong! :- ${error.message}` });
  }
};

// Update the product functionality
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated product
      runValidators: true, // Ensure the updated data is validated according to schema
    });
    if (!updateProduct) {
      return res.status(404).json({ message: "Product does not exist!" });
    }
    res.status(200).json(updateProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Something went wrong! :- ${error.message}` });
  }
};

// Delete product functionality
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) {
      res.status(404).json({ message: "Could not found the product" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `something went wrong! :- ${error.message}` });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
};
