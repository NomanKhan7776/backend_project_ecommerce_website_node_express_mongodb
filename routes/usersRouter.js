import express from "express";
import { validateUser } from "../middlewares/joiUserValidation.js";
import registerUser from "../controllers/userController.js";
const usersRouter = express.Router();

usersRouter.post("/register", validateUser, registerUser);

export default usersRouter;
