const express = require("express");
const passport = require("passport");
const {
  getQuestions,
  saveAnswers,
  uploadApparel,
  getCloset,
  getApparelTypes,
} = require("../controller/user");
const { isLoggedIn } = require("./auth");

const router = express.Router();

/**
 * @description Gets active questions from db
 */
router.get("/stylequiz", getQuestions);
/**
 * @description save answers from user quiz to db
 */
router.post("/stylequiz", saveAnswers);
/**
 * @description Uploads users apparel to db
 */
router.post("/createcloset", uploadApparel);
/**
 * @description Gets combinations from db of specific user
 */
/**
 * @description Gets type of apparel options from database
 */
router.get("/getappareltypes", getApparelTypes);
router.get("/getcloset", getCloset);

module.exports = { router };
