import { productmodel } from "../models/product.model.js";

export const createProduct = async (req, res, next) => {
  const { name, price, discount, bgcolor, panelcolor, textcolor, sku } =
    req.body;
  const { buffer, mimetype } = req.file;
  try {
    const isProductExist = await productmodel.findOne({ sku });
    if (isProductExist) {
      req.flash("errors", "product already exist with this SKU");
      return res.redirect("/owner/admin");
    }
    const product = await productmodel.create({
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
      image: {
        data: buffer,
        mimetype,
      },
      sku,
    });
    req.flash("success", "Product created successfully");
    return res.redirect("/owner/admin");
  } catch (error) {
    req.flash("errors", error.message);
    next(error);
  }
};
