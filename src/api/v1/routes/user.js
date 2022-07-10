const express = require("express");
const passport = require("passport");
const { isLoggedIn } = require("./auth");

const router = express.Router();

router.get("/name", (req, res) => {
  res.send("this is trial of user");
});

module.exports = { router };
