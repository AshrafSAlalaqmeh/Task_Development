const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../middleware/asyncHandler");
const productionController = require("./production.controller");
const validator = require("./production.validator");

router.post(
  "/addingProduct",
  validator.createNewProduct,
  asyncHandler(productionController.createNewProduct)
);

router.put(
  "/:production_id",
  validator.updateProduct,
  asyncHandler(productionController.updateProduct)
);

router.get("/", asyncHandler(productionController.getProduct));

router.delete(
  "/:production_id",
  validator.deleteProduct,
  asyncHandler(productionController.deleteProduct)
);

module.exports = router;
