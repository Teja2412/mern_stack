const express = require("express");
const router = express.Router();
const {
  getProductDetails,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product");

router.get("/", getAllProducts);
router.get("/:id", getProductDetails);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
