/* eslint-disable camelcase */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { google_client_id, google_secret } = require('./config');
const User = require('../models/user');
const Provider = require('../models/provider');

const passportFunction = () => {
  passport.use(
    'google',
    new GoogleStrategy(
      {
        clientID: google_client_id,
        clientSecret: google_secret,
        response_type: 'code',
        // grant_type: "authorization_code",
        callbackURL: 'http://localhost:3000/auth/google/callback',
        passReqToCallback: true
      },
      async (request, accessToken, refreshToken, profile, cb) => {
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);
        User.findOne({ where: { email: profile.emails[0].value } })
          .then((data) => {
            if (data) {
              // user exists
              return cb(null, data);
            }
            // create new user
            return Promise.resolve(
              Provider.findOne({
                where: { provider_name: profile.provider },
                attributes: ['id', 'provider_name']
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
                  provider_id: p_id.dataValues.id
                };
                return Promise.resolve(User.create(defaultUser));
              })
              .then((dt) => cb(null, dt));
          })
          .catch((error) => cb(error, false));
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, cb) => {
    if (id) cb(null, id);
  });
};
module.exports = { passportFunction };
