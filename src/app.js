const express = require("express");
const passport = require("passport");
// const helmet = require("helmet");
const cors = require("cors");
const { passportFunction } = require("./config/passport");
const { logger } = require("./api/middlewares/logger");
const expressSession = require("express-session");
const app = express();

const apiRouterV1 = require("./api/v1/routes/api");
const authRouter = require("./api/v1/routes/auth").router;

app.use(
  expressSession({
    secret: "ye toh abhi kuch v chlega",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passportFunction(passport);
// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger);
app.use("/", authRouter);
app.use("/v1", apiRouterV1);

module.exports = { app };
