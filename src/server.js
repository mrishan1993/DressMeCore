const { Sequelize } = require('sequelize');
const https = require('http');
const { mysqlCreds, port } = require('./config/config');

const sequelize = new Sequelize(
  mysqlCreds.database,
  mysqlCreds.user,
  mysqlCreds.password,
  {
    host: mysqlCreds.host,
    dialect: 'mysql',
    logging: false
  }
);
sequelize.sync();

const startServer = (appObj) =>
  Promise.resolve(sequelize.authenticate())
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((error) => {
      console.error('Unable to connect to the database:', error);
    })
    .then(() => Promise.resolve(https.createServer(appObj).listen(port)))
    .then(() => {
      console.log(`Server started on port ${port}`);
    })
    .catch((error) => {
      sequelize.close();
      console.log(error.message);
    });

module.exports = { startServer, sequelize };
