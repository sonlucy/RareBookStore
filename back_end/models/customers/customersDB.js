// customerDB.js

const db = require("../../database/db");

// 모든 회원 조회 (Read)
exports.getAllCustomers = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM customers", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// 특정 회원 조회 (Read)
exports.getCustomerById = (custKey) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM customers WHERE custKey = ?",
      custKey,
      (err, result) => {
        if (err) reject(err);
        else resolve(result[0]); // Assuming only one user is returned
      }
    );
  });
};

// 회원 정보 업데이트 (Update)
exports.updateCustomer = (custKey, updatedCustomerData) => {
  return new Promise((resolve, reject) => {
    const {
      userid,
      email,
      userpwd,
      nickname,
      age,
      gender,
      contact,
      grade,
      point,
    } = updatedCustomerData;
    db.query(
      "UPDATE customers SET userid = ?, email = ?, userpwd = ?, nickname = ?, age = ?, gender = ?, contact = ?, grade = ?, point = ? WHERE custKey = ?",
      [
        userid,
        email,
        userpwd,
        nickname,
        age,
        gender,
        contact,
        grade,
        point,
        custKey,
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// // 회원 삭제 (Delete)
// exports.deleteCustomer = (custKey) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//       "DELETE FROM customers WHERE custKey = ?",
//       custKey,
//       (err, result) => {
//         if (err) reject(err);
//         else resolve(result);
//       }
//     );
//   });
// };
