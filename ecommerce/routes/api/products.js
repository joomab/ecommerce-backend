const express = require("express");
const router = express.Router();
const ProductsService = require("../../services/products");

const ProductService = new ProductsService();

//Validación de esquemas
const validation = require("../../utils/middlewares/validationHandler");
const {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema,
} = require("../../utils/schemas/products");

router.get("/", async (req, res, next) => {
  const { tags } = req.query;

  try {
    const products = await ProductService.getProducts({ tags });
    res.status(200).json({
      data: products,
      message: "products listed",
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await ProductService.getProduct({ productId });
    res.status(200).json({
      data: product,
      message: "product retrived",
    });
  } catch (e) {
    next(e);
  }
});

//Pasamos primero el middleware de validación y luego se ejecuta el otro middleware
router.post("/", validation(createProductSchema), async (req, res, next) => {
  const { body: product } = req;
  console.log("request", req.query);
  try {
    const createdProduct = await ProductService.createProduct({ product });
    res.status(201).json({
      data: createdProduct,
      message: "product created",
    });
  } catch (e) {
    next(e);
  }
});

//El middleware de validación primero valida el Id de params y luego valida el body del request.
router.put(
  "/:productId",
  validation({ productId: productIdSchema }, "params"),
  validation(updateProductSchema),
  async (req, res, next) => {
    const { productId } = req.params;
    const { body: product } = req;
    console.log("request", req.query);
    try {
      const updatedproduct = await ProductService.updateProduct({
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
  }
);

router.delete("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  console.log("request", req.query);
  try {
    const deletedProduct = await ProductService.deleteProduct({ productId });

    res.status(200).json({
      data: deletedProduct,
      message: "product deleted",
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
