const mysql = require("mysql");
const https = require("http");
const { mysqlCreds, port } = require("./config");

let db = mysql.createConnection({
  host: mysqlCreds.host,
  port: mysqlCreds.port,
  user: mysqlCreds.user,
  password: mysqlCreds.password,
  database: mysqlCreds.database,
});

const connectToDb = (connection) => {
  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("connected as id " + connection.threadId);
  });
};

const closeConnection = (connection) => {
  connection.end();
};

const runQuery = (connection, query) => {
  let sql = "CREATE DATABASE nodemysql";

  connection.query(sql, (err) => {
    if (err) {
      throw err;
    }

    console.log("Query completed");
  });
};

const getDb = () => {
  return db;
};

const startServer = (appObj) => {
  return Promise.resolve(connectToDb(db))
    .then(() => {
      return Promise.resolve(https.createServer(appObj).listen(port));
    })
    .then(() => {
      console.log(`Server started on port ${port}`);
    })
    .catch((error) => {
      closeConnection(db);
      console.log(error.message);
    });
};

module.exports = { getDb, startServer, runQuery };
