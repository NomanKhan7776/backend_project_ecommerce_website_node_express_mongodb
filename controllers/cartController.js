import user from "../models/user.model.js";

export const cartController = async (req, res, next) => {
  try {
    const userCart = await user
      .findOne({ email: req.user.email })
      .populate("cart");
    let totalMRP = 0;
    let totalDiscount = 0;
    let shippingFee = 0;
    let plateformFee = 50;
    userCart.cart.forEach((product) => {
      totalMRP += product.price;
      if (product.discount) {
        totalDiscount += product.price - product.discount;
      }
    });
    let totalPrice = totalMRP - totalDiscount + plateformFee + shippingFee;
    let priceDetails = {
      totalMRP,
      totalDiscount,
      shippingFee,
      plateformFee,
      totalPrice,
    };

    res.render("cart", { userCart, priceDetails });
  } catch (error) {
    throw new Error(error.message);
    next(error);
  }
};
