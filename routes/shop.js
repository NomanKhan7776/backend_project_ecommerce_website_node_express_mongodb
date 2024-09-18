import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { productmodel } from "../models/product.model.js";
const shopRouter = express.Router();

shopRouter.get("/", isLoggedIn, async (req, res) => {
  try {
    const products = await productmodel.find();
    if (products) {
      res.render("shop", { products });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
export default shopRouter;
