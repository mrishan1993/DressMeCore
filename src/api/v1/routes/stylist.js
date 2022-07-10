const express = require("express");
const passport = require("passport");
const { isLoggedIn } = require("./auth");

const router = express.Router();

router.get("/one", (req, res) => {
  res.send("this is trial of stylist api");
});

module.exports = { router };
