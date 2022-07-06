const express = require("express");
// const passport = require("passport");
// const helmet = require("helmet");
const cors = require("cors");
const { logger } = require("./api/middlewares/logger");

const app = express();

const apiRouterV1 = require("./api/v1/routes/api");

// passportFunction(passport);
// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger);
app.use("/v1", apiRouterV1);

module.exports = { app };
