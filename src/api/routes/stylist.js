const express = require('express');
const {
  getUsers,
  saveCombination,
  getApparels
} = require('../controller/stylist');

const router = express.Router();

/**
 * @description Gets users list from db
 */
router.get('/users', getUsers);
/**
 * @description Gets apparels of users from db
 */
router.get('/getApparels', getApparels);
/**
 * @description saves created combination by stylist to db
 */
router.post('/uploadcombination', saveCombination);

module.exports = { router };
