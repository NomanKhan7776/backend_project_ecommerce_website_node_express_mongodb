import Joi from "joi";
const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
const colorSchema = Joi.string()
  .custom((value, helper) => {
    if (hexColorRegex.test(value)) {
      return value;
    }
    return helper.error("any.invalid");
  })
  .messages({
    "any.invalid": "Invalid color format. Use a valid hex color.",
    "string.base": "only hex color are allowed",
  });

const createProductSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "name must be a string",
    "any.required": "name is required",
  }),
  sku: Joi.string().required().messages({
    "string.base": "SKU must be a string",
    "any.required": "SKU is a required",
  }),
  price: Joi.number().required().messages({
    "number.base": "price must be a number",
    "any.required": "price is required",
  }),
  discount: Joi.number().required().messages({
    "number.base": "discount must be a number",
    "any.required": "discount is required",
  }),
  bgcolor: colorSchema.required().messages({
    "any.required": "backGround color is required",
  }),
  panelcolor: colorSchema.required().messages({
    "any.required": "panel color is required",
  }),
  textcolor: colorSchema.required().messages({
    "any.required": "text color is required",
  }),
});

export const vaildateProduct = (req, res, next) => {
  if (!req.file) {
    req.flash("errors", ["Image is required"]);
    return res.redirect("/owner/admin");
  }

  const { error } = createProductSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    req.flash(
      "errors",
      error.details.map((err) => err.message)
    );
    return res.redirect("/owner/admin");
  }
  next();
};
