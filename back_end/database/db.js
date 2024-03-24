//db.js

const mysql = require("mysql");
require("dotenv").config();
const conn = mysql.createConnection({
  host: process.env.REACT_APP_HOST,
  user: process.env.REACT_APP_USER,
  password: process.env.REACT_APP_PASSWORD,
  database: process.env.REACT_APP_DATABASE,
});

conn.connect((err) => {
  if (err) console.log(err);
  else console.log("Connected to the database");
});

module.exports = conn;
