import jwt from "jsonwebtoken";
import user from "../models/user.model.js";
const isLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("errors", "you must to be login");
    return res.redirect("/");
  }

  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
    const isUser = await user
      .findOne({ email: decoded.email })
      .select("-password");
    req.user = isUser;
    next();
  } catch (error) {
    req.flash("errors", "something went wrong");
    res.redirect("/");
  }
};

export default isLoggedIn;
