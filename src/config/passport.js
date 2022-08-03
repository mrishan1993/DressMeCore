const passport = require("passport");
const { google_client_id, google_secret } = require("./config");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AppleStrategy = require("passport-apple");
const User = require("../models/user");
const { appleVerify, googleVerify } = require("../api/v1/routes/auth/verify");
const Provider = require("../models/provider");
// const { getDb } = require("../server");
// const db = getDb();
const passportFunction = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: google_client_id,
        clientSecret: google_secret,
        response_type: "code",
        grant_type: "authorization_code",
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, cb) => {
        console.log(accessToken);
        User.findOne({ where: { email: profile.emails[0].value } }).then(
          (data) => {
            console.log(data);
            if (data) {
              //user exists
            } else {
              return Promise.resolve(
                Provider.findOne({
                  where: { provider_name: profile.provider },
                  attributes: ["id", "provider_name"],
                })
              )
                .then((p_id) => {
                  const defaultUser = {
                    profile_id: profile.id,
                    name: `${profile.name.givenName} ${profile.name.familyName}`,
                    first_name: `${profile.displayName}`,
                    last_name: `${profile.displayName}`,
                    email: profile.emails[0].value,
                    dob: profile.birthday,
                    gender: profile.gender,
                    picture: profile.photos[0].value,
                    isActive: true,
                    provider_id: p_id.dataValues.id,
                  };
                  return Promise.resolve(User.create(defaultUser));
                })
                .then((dt) => {
                  return cb(null, dt);
                });
            }
          }
        );
      }
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
  passport.serializeUser((user, done) => {
    // console.log("Serializing user:", user);
    done(null, user);
  });

  passport.deserializeUser(async (id, cb) => {
    // console.log("this is the id", id);
    // const user = await User.findOne({ where: { id } }).catch((err) => {
    //   console.log("Error deserializing", err);
    //   cb(err, null);
    // });

    // console.log("DeSerialized user", user);

    if (id) cb(null, id);
  });
};
module.exports = { passportFunction };
