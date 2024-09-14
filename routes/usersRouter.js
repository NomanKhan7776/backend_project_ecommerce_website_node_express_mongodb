import express from "express";

const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
  res.send("its working");
});

export default usersRouter;
