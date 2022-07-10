const passport = require("passport");
const express = require("express");

const router = express.Router();

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/google");
};
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

router.get("/login/apple", passport.authenticate("apple"));
router.post("/auth/apple/callback", (req, res, next) => {
  passport.authenticate("apple", function (err, user, info) {
    if (err) {
      if (err == "AuthorizationError") {
        res.redirect("/auth/failure");
      } else if (err == "TokenError") {
        res.send(
          "Oops! Couldn't get a valid token from Apple's servers! <br /> \
                <a href=\"/login\">Sign in with Apple</a>"
        );
      }
    } else {
      res.json(user);
    }
  })(req, res, next);
});
router.get("/protected", checkAuthenticated, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});
router.get("/auth/failure", (req, res) => {
  res.send("Failed to authenticate..");
});
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
  req.session.destroy();
  res.send("Logged Out!");
});
module.exports = { router, checkAuthenticated };
