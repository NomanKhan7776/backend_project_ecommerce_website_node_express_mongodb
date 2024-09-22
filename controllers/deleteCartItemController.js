import user from "../models/user.model.js";

export const deleteCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    await user.updateOne(
      {
        email: req.user.email,
      },
      { $pull: { cart: id } }
    );
    res.redirect("/shop/cart");
  } catch (error) {
    next(error);
  }
};
