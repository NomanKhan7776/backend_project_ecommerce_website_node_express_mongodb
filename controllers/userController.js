import user from "../models/user.model.js";
import genrateToken from "../utils/genrateTokenJWT.js";
import passwordHashing from "../utils/passwordHashing.js";
import bcrypt from "bcrypt";
export const registerUser = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;
    const existUser = await user.findOne({ email });
    if (existUser) {
      req.flash("error", "This Email Is Already Exist");
      return res.redirect("/");
    }

    const hash = await passwordHashing(password);
    const createdUser = await user.create({
      fullname,
      email,
      password: hash,
    });
    // const token = genrateToken(createdUser);
    // res.cookie("token", token);
    req.flash("success", "your account is created! please log In");
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userExist = await user.findOne({ email });
    if (!userExist) {
      req.flash("errors", "Email And Password Incorrect");
      return res.redirect("/");
    }
    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (!isPasswordValid) {
      req.flash("errors", "Email And Password Incorrect");
      return res.redirect("/");
    }
    const token = genrateToken(userExist);
    res.cookie("token", token);

    res.redirect("/shop");
  } catch (error) {
    next(error);
  }
};
