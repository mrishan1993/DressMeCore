const express = require("express");
const passport = require("passport");
const { addQuestion } = require("../controller/dbroutes");
const { isLoggedIn } = require("./auth");

const router = express.Router();

/**
 * @description add questions to db
 */
router.post("/addquestion", addQuestion);

module.exports = { router };
