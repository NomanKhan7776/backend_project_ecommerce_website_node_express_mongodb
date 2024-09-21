import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    errors: req.flash("errors"),
    error: req.flash("error"),
    success: req.flash("success"),
    loggedIn: false,
  });
});

export default router;
