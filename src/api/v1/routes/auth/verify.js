const { getDb, runQuery } = require("../../../../server");

const db = getDb();
// const verify = (issuer, profile, cb) => {
//   console.log("this is issuer", issuer);
//   console.log("this is profile", profile.id);
//   db.query(
//     "SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?",
//     [issuer, profile.id],
//     function (err, row) {
//       if (err) {
//         return cb(err);
//       }
//       if (!row) {
//         db.run(
//           "INSERT INTO users (name) VALUES (?)",
//           [profile.displayName],
//           function (err) {
//             if (err) {
//               return cb(err);
//             }

//             var id = this.lastID;
//             db.run(
//               "INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)",
//               [id, issuer, profile.id],
//               function (err) {
//                 if (err) {
//                   return cb(err);
//                 }
//                 var user = {
//                   id: id,
//                   name: profile.displayName,
//                 };
//                 return cb(null, user);
//               }
//             );
//           }
//         );
//       } else {
//         db.get(
//           "SELECT * FROM users WHERE id = ?",
//           [row.user_id],
//           function (err, row) {
//             if (err) {
//               return cb(err);
//             }
//             if (!row) {
//               return cb(null, false);
//             }
//             return cb(null, row);
//           }
//         );
//       }
//     }
//   );
// };
const googleVerify = (request, accessToken, refreshToken, profile, done) => {
  return done(null, profile);
};
const appleVerify = (req, accessToken, refreshToken, idToken, profile, cb) => {
  cb(null, idToken);
};
module.exports = { appleVerify, googleVerify };
