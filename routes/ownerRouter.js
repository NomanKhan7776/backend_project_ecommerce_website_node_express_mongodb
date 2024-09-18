import express from "express";
import owner from "../models/owner.model.js";
const ownerRouter = express.Router();


if (process.env.NODE_ENV === "development") {
  ownerRouter.post("/create", async (req, res) => {
    const { email, fullname, password } = req.body;
    let isOwnerExist = await owner.find();
    if (isOwnerExist.length === 0) {
      const createdOwner = await owner.create({
        email,
        password,
        fullname,
      });
      res.status(201).send(createdOwner);
    } else {
      res.status(500).send("multiple owner did not allowed!");
    }
  });
}

ownerRouter.get("/admin", (req, res) => {
  res.render("createproducts", {
    errors: req.flash("errors"),
    error: req.flash("error"),
    success: req.flash("success"),
  });
});


export default ownerRouter;
