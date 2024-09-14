import express from "express";

const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
  res.send("its working");
});

export default productsRouter;
