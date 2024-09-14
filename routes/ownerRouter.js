import express from "express";

const ownerRouter = express.Router();

ownerRouter.get("/", (req, res) => {
  res.send("its working");
});

export default ownerRouter;
