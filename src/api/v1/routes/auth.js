const passport = require("passport");
const { OAuth2Client } = require("google-auth-library");
const express = require("express");
const { verifyUser } = require("./auth/verify");
const { google } = require("googleapis");
const Session = require("../../../models/session");
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/auth/google/callback"
);

const router = express.Router();

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/google");
};
// router.post("/auth/backend", verifyUser);
// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["openid", "email", "profile"] })
// );

// const getAuthUrl = () => {
//   return oAuth2Client.generateAuthUrl({
//     access_type: "offline",
//     // prompt: "consent",
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.email",
//       "https://www.googleapis.com/auth/userinfo.profile",
//     ],
//   });
// };

router.get("/login", (req, res) => {
  let token = req.body.token;
  console.log(token);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload["sub"];
  }
  verify().catch((e) => {
    console.log(e);
  });
});

// // Handle Redirect URL
// router.get("/login-google", async (req, res) => {
//   const { code } = req.query;
//   const { tokens } = await oAuth2Client.getToken(code);
//   oAuth2Client.credentials = tokens;
//   const oauth2 = google.oauth2("v2");
//   // Get Google User
//   const {
//     data: { email, id: google_open_id },
//   } = await oauth2.userinfo.v2.me.get({
//     auth: oAuth2Client,
//   });
//   // Upsert User
//   //enter user into db
//   console.log(rows);
//   const user = rows[0];
//   // Create JWT
//   var token = jwt.sign(user, secret);
//   // Login Redirect to Frontend
//   res.redirect(`/login/google?token=${token}`);
// });

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     session: false,
//     scope: ["email", "profile"],
//     successRedirect: "/protected",
//     failureRedirect: "/auth/failure",
//   })
// );

router.get("/auth/google/callback", async (req, res, next) => {
  const code = req.query.code;
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  //is token ko db m safe rkhna hai
  Session.create({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    user_id: 1,
  });
  res.send(tokens);
  next();
});

module.exports = { router, checkAuthenticated };
