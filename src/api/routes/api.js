const express = require('express');

const router = express.Router();
const userRouter = require('./user').router;
const stylistRouter = require('./stylist').router;
const dbRouter = require('./dbroutes').router;

router.use('/user/', userRouter);
router.use('/stylist/', stylistRouter);
router.use('/system/', dbRouter);
module.exports = router;
