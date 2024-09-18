import express from "express";
import { vaildateProduct } from "../middlewares/joiProductValidation.js";
import upload from "../middlewares/multerMiddleware.js";
import { createProduct } from "../controllers/productController.js";
const productsRouter = express.Router();

productsRouter.post(
  "/create",
  upload.single("image"),
  vaildateProduct,
  createProduct
);

export default productsRouter;
