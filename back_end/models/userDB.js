// userDB.js

const db = require("../database/db.js"); // 데이터베이스 연결 설정

exports.signUp = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO customers (userid, userpwd, email, nickname, age, gender, contact, grade, point) VALUES (?,?,?,?,?,?,?,?,?) `,
      [
        data[0],
        data[1],
        data[2],
        data[3],
        data[4],
        data[5],
        data[6],
        data[7],
        data[8],
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};
exports.getUser = (userid) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM customers where userid = ?`,
      userid,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};
