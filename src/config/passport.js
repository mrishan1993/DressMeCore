const passport = require("passport");
const { google_client_id, google_secret } = require("./config");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AppleStrategy = require("passport-apple");
const { appleVerify, googleVerify } = require("../api/v1/routes/auth/verify");
const passportFunction = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: google_client_id,
        clientSecret: google_secret,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true,
      },
      googleVerify
    )
  );
  // passport.use(
  //   new AppleStrategy(
  //     {
  //       clientID: "",
  //       teamID: "",
  //       callbackURL: "",
  //       keyID: "",
  //       privateKeyLocation: "",
  //       passReqToCallback: true,
  //     },
  //     appleVerify
  //   )
  // );
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
};

module.exports = { passportFunction };
