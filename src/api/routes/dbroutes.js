const express = require('express');
const { addQuestion } = require('../controller/dbroutes');

const router = express.Router();

/**
 * @description add questions to db
 */
router.post('/addquestion', addQuestion);

module.exports = { router };
