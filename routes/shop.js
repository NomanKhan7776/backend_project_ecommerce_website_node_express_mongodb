import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { productmodel } from "../models/product.model.js";
import user from "../models/user.model.js";
import { cartController } from "../controllers/cartController.js";
import {
  checkoutCancelController,
  checkoutController,
  checkoutSuccessController,
} from "../controllers/checkoutController.js";
import { deleteCartItem } from "../controllers/deleteCartItemController.js";
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
shopRouter.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  try {
    const existUser = await user.findOne({ email: req.user.email });

    existUser.cart.push(id);
    await existUser.save();
    req.flash("success", "added to cart");

    res.redirect("/shop");
  } catch (error) {
    console.log("error occured", error);
    req.flash("errors", "something went wrong");
    res.redirect("/shop");
  }
});
shopRouter.get("/cart", isLoggedIn, cartController);
shopRouter.post("/checkout", isLoggedIn, checkoutController);
shopRouter.get("/checkout-success", isLoggedIn, checkoutSuccessController);
shopRouter.get("/checkout-cancel", isLoggedIn, checkoutCancelController);
shopRouter.get("/cart/delete/:id", isLoggedIn, deleteCartItem);
export default shopRouter;
