import user from "../models/user.model.js";
import passwordHashing from "../utils/passwordHashing.js";

const registerUser = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;
    const existUser = await user.findOne({ email });
    if (existUser) {
      req.flash("error", "This Email Is Already Exist");
      return res.redirect("/register");
    }

    const hash = await passwordHashing(password);
    const createdUser = await user.create({
      fullname,
      email,
      password: hash,
    });
    res.send(createdUser);
  } catch (error) {
    next(error);
  }
};

export default registerUser;
