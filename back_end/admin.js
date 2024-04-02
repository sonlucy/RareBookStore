// const express = require("express"); // npm i express | yarn add express
// const cors = require("cors"); // npm i cors | yarn add cors
// const mysql = require("mysql2"); // npm i mysql2 | yarn add mysql
// const app = express();
// const port = 3001; // 포트번호 설정

// const { error } = require("console");
// const conn = require("./database/db.js");

// app.use(express.json());

// app.use(
//   cors({
//     origin: "*", // 출처 허용 옵션
//     credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
//     optionsSuccessStatus: 200, // 응답 상태 200으로 설정
//   })
// );

// app.use(express.urlencoded({ extended: true }));

// // ====================== customers ==========================//
// app.get("/customers", (req, res) => {
//   const sql = "select * from customers";
//   conn.query(sql, (error, data) => {
//     if (error) return res.json(error);
//     return res.json(data);
//   });
// });

// app.get("/customers/:custKey", (req, res) => {
//   const custKey = req.params.custKey;
//   const sql = `SELECT * FROM customers WHERE custKey = '${custKey}'`;
//   conn.query(sql, (error, results) => {
//     if (error) {
//       console.error("Error fetching customer:", error);
//       res.status(500).json({ error: "Internal server error" });
//     } else {
//       if (results.length === 0) {
//         res.status(404).json({ error: "Customer not found" });
//       } else {
//         res.json(results[0]); // 첫 번째 고객 정보 반환
//       }
//     }
//   });
// });

// app.put("/updateCustomers/:custKey", (req, res) => {
//   const custKey = req.params.custKey;
//   const updatedCustomerData = req.body;

//   const {
//     userid,
//     email,
//     userpwd,
//     nickname,
//     age,
//     gender,
//     contact,
//     grade,
//     point,
//   } = updatedCustomerData;

//   const sql = `
//     UPDATE customers
//     SET userid = ?,
//         email = ?,
//         userpwd = ?,
//         nickname = ?,
//         age = ?,
//         gender = ?,
//         contact = ?,
//         grade = ?,
//         point = ?
//     WHERE custKey = ?
//   `;

//   conn.query(
//     sql,
//     [
//       userid,
//       email,
//       userpwd,
//       nickname,
//       age,
//       gender,
//       contact,
//       grade,
//       point,
//       custKey,
//     ],
//     (error, result) => {
//       if (error) {
//         console.error("Error updating customer:", error);
//         res.status(500).json({ error: "Internal server error" });
//       } else {
//         if (result.affectedRows === 0) {
//           res.status(404).json({ error: "Customer not found" });
//         } else {
//           res.json({ message: "Customer updated successfully" });
//         }
//       }
//     }
//   );
// });

// app.get("/enquiries", (req, res) => {
//   const sql = "select * from enquiry";
//   conn.query(sql, (error, data) => {
//     if (error) return res.json(error);
//     return res.json(data);
//   });
// });

// app.get("/buyerbook", (req, res) => {
//   const sql = "select * from buyerbook";
//   conn.query(sql, (error, data) => {
//     if (error) return res.json(error);
//     return res.json(data);
//   });
// });

// // enquiry.js에서 받은 문의답글 서버에 저장
// app.post("/reply", (req, res) => {
//   const { boardKey, reply } = req.body;
//   const adminKey = 1; // 관리자키 임의로 1로 지정
//   const date = new Date().toISOString(); // 현재 날짜 및 시간

//   // reply 테이블에 새로운 답글을 추가
//   const sql = `INSERT INTO reply (boardKey, adminKey, date, reply) VALUES (?, ?, ?, ?)`;
//   conn.query(sql, [boardKey, adminKey, date, reply], (error, results) => {
//     if (error) {
//       console.error("Error submitting reply:", error);
//       res.status(500).json({ error: "server error" });
//     } else {
//       res.status(200).json({ message: "성공적으로 답글을 추가했습니다." });
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
