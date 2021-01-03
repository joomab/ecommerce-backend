const express = require("express");
const router = express.Router();
const ProductsService = require("../../services/products");

const productService = new ProductsService();

router.get("/", async (req, res, next) => {
  const { tags } = req.query;

  try {
    const products = await productService.getProducts({ tags });
    res.status(200).json({
      data: products,
      message: "products listed",
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await productService.getProduct({ productId });
    res.status(200).json({
      data: product,
      message: "product retrived",
    });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res) => {
  const { body: product } = req;

  try {
    const createdProduct = await productService.createProduct({ product });
    res.status(201).json({
      data: createdProduct,
      message: "product created",
    });
  } catch (e) {
    next(e);
  }
});

router.put("/:productId", async (req, res) => {
  const { productId } = req.params;
  const { body: product } = req;

  try {
    const updatedproduct = await productService.updateProduct({
      productId,
      product,
    });

    res.status(200).json({
      data: updatedproduct,
      message: "product updated",
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await productService.deleteProduct({ productId });

    res.status(200).json({
      data: product,
      message: "product deleted",
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
