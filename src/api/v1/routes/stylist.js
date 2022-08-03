const express = require("express");
const passport = require("passport");
const { getUsers, saveCombination } = require("../controller/stylist");
const { getCloset } = require("../controller/user");
const { isLoggedIn } = require("./auth");

const router = express.Router();

/**
 * @description Gets users list from db
 */
router.get("/users", getUsers);
/**
 * @description Gets apparels of users from db
 */
router.get("/getcloset", getCloset);
/**
 * @description saves created combination by stylist to db
 */
router.post("/uploadcombination", saveCombination);
/**
 * @description Gets users list from db
 */
router.get("/users", getUsers);

module.exports = { router };
