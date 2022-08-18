const passport = require('passport');
// const { OAuth2Client } = require("google-auth-library");
const express = require('express');
// const { verifyUser } = require("./auth/verify");
// const { google } = require("googleapis");
// const Session = require("../../models/session");
// const oAuth2Client = new OAuth2Client(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   "http://localhost:3000/auth/google/callback"
// );

const router = express.Router();

// const checkAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/auth/google");
// };
// let access_token = "";
// let refresh_token = "";

// router.get("/gettokens", (req, res) => {});

// router.get("/login", (req, res) => {
//   let token = req.body.token;
//   console.log(token);
//   async function verify() {
//     const ticket = await oAuth2Client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload();
//     const userId = payload["sub"];
//   }
//   verify().catch((e) => {
//     console.log(e);
//   });
// });

// router.get("/auth/google/callback", async (req, res, next) => {
//   const code = req.query.code;
//   const { tokens } = await oAuth2Client.getToken(code);
//   oAuth2Client.setCredentials(tokens);
//   //is token ko db m safe rkhna hai
//   Session.create({
//     access_token: tokens.access_token,
//     refresh_token: tokens.refresh_token,
//     user_id: 1,
//   });
//   res.send(tokens);
//   next();
// });

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: 'offline',
    session: false
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  (req, res, next) => {
    // for use with express-session
    // req.session.user = req.user;
    const { code } = req.query;
    console.log('Code', code);
    console.log('this is the request object', req);
    const tokens = 'kuch bhi';
    res.send(tokens);
    next();
  }
);

router.get(
  '/protected',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  (req, res, next) => {
    console.log(req.user);
    next();
  }
);
module.exports = { router };
