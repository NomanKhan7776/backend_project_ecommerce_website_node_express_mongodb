import express from "express";
import { validateUser } from "../middlewares/joiUserRegisterValidation.js";
import { loginUser, registerUser } from "../controllers/userController.js";
import { validateLogin } from "../middlewares/joiUserLoginValidation.js";
const usersRouter = express.Router();

usersRouter.post("/register", validateUser, registerUser);
usersRouter.post("/login", validateLogin, loginUser);
usersRouter.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});
export default usersRouter;
