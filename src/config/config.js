const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  passport: {
    secret: process.env.secret_key,
    EXPIRES_IN: 24 * 60 * 60,
  },
  mysqlCreds: {
    port: process.env.node_environment == "prod" ? process.env.db_port : 3306,
    host:
      process.env.node_environment == "prod"
        ? process.env.db_host
        : "localhost",
    user: process.env.node_environment == "prod" ? process.env.db_user : "root",
    password:
      process.env.node_environment == "prod"
        ? process.env.db_password
        : "password",
    database:
      process.env.node_environment == "prod" ? process.env.database : "dressup",
  },
  port: process.env.PORT || 3000,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_secret: process.env.GOOGLE_CLIENT_SECRET,
};
