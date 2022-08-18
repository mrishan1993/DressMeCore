const express = require('express');
const passport = require('passport');
// const helmet = require("helmet");
const cors = require('cors');
const { passportFunction } = require('./config/passport');
const { logger } = require('./api/helpers/logger');

const app = express();

const apiRouterV1 = require('./api/routes/api');
const authRouter = require('./api/routes/auth').router;

app.use(passport.initialize());
app.use(passport.session());
passportFunction(passport);
// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger);
app.use('/', authRouter);
app.use('/v1', apiRouterV1);

module.exports = { app };
