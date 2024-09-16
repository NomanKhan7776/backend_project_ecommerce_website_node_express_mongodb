import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
const shopRouter = express.Router();

shopRouter.get("/", isLoggedIn, (req, res) => {
  res.send("welcome to our shop");
});
export default shopRouter;
