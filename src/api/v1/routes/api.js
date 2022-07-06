const express = require("express");

const router = express.Router();
const trialRouter = require("./trial").router;

router.use("/trial/", trialRouter);

module.exports = router;
