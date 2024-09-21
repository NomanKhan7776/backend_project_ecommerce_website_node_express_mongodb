import Stripe from "stripe";
import user from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const checkoutController = async (req, res, next) => {
  const { totalPrice } = req.body;
  const { email } = req.user;
  try {
    const cartUser = await user.findOne({ email }).populate("cart");
    if (totalPrice <= 0) {
      req.flash("errors", "Total price must be greater than zero.");
      return res.redirect("/shop/cart");
    }
    const line_items = cartUser.cart.map((item) => {
      const discountAmount = item.discount !== 0 ? item.discount : 0;
      const finalPrice = Math.max(item.price - discountAmount);

      if (typeof finalPrice !== "number" || isNaN(finalPrice)) {
        throw new Error("Invalid final price calculated");
      }
      return {
        price_data: {
          currency: "usd",

          product_data: {
            name: item.name,
          },
          unit_amount: finalPrice * 100,
        },
        quantity: 1,
      };
    });
    const plateformFee = 50;
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "plateform FEE",
        },
        unit_amount: plateformFee * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.protocol}://${req.get("host")}/shop/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/shop/checkout-cancel`,
    });
    res.redirect(303, session.url);
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    req.flash("errors", "There was an issue creating the payment session.");
    res.redirect("/shop/cart");
  }
};

export const checkoutSuccessController = (req, res) => {
  res.render("checkoutsuccess", { title: "Payment Successful" });
};

export const checkoutCancelController = (req, res) => {
  res.render("checkouterror", { title: "Payment Cancelled" });
};
