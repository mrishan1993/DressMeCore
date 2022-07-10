const express = require("express");
const passport = require("passport");
const { isLoggedIn } = require("./auth");

const router = express.Router();
const userRouter = require("./user").router;
const stylistRouter = require("./stylist").router;

router.get("/home", passport.authenticate(["google"]), (req, res, next) => {
  res.send("This is the home page for now");
});
router.use("/user/", userRouter);
router.use("/stylist/", stylistRouter);
module.exports = router;
