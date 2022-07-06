const express = require("express");

const router = express.Router();

router.get("/one", (req, res) => {
  console.log("inside the function");
  res.send("this is trial of api");
});

module.exports = { router };
