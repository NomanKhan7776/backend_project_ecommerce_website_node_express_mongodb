import Joi from "joi";

const userSchema = Joi.object({
  fullname: Joi.string().min(4).required().messages({
    "string.base": "Name must Be a String",
    "string.min": "Name must be at least 3 characters long",
    "any.required": "Enter full name",
  }),
  email: Joi.string().email().required().messages({
    "string:email": "Enter a valid Email",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "password must be at least 6 characters long",
    "any.required": "password is required",
  }),
});

export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    req.flash(
      "errors",
      error.details.map((err) => err.message)
    );
    return res.send(error.details.map((err) => err.message));
  }
  next();
};
