// server.js

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const { error } = require("console");
const userRoutes = require("./routes/userRoutes");
const conn = require("./database/db.js");
const port = 3001; //포트번호 설정

app.use(express.json());
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "*",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

// 세션 설정
app.use(
  session({
    // name:'sid', // 세션 이름
    secret: "mySecretKey", // 세션을 암호화하기 위한 비밀키
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // HTTPS를 통해서만 쿠키 전송
      maxAge: 1000 * 60 * 60 * 24, // 세션의 유효기간 (예: 1일)
    },
  })
);

// user 라우트 연결
app.use("/api", userRoutes);

// ================ Admin 페이지 관련 라우터 설정 ================ //
app.get("/enquiries", (req, res) => {
  const sql = "select * from enquiry";
  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

app.get("/customers", (req, res) => {
  const sql = "select * from customers";
  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

app.get("/buyerbook", (req, res) => {
  const sql = "select * from buyerbook";
  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

app.get("/customers/:custKey", (req, res) => {
  const custKey = req.params.custKey;
  const sql = `SELECT * FROM customers WHERE custKey = ${custKey}`;
  conn.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching customer:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: "Customer not found" });
      } else {
        res.json(results[0]); // 첫 번째 고객 정보 반환
      }
    }
  });
});

// enquiry.js에서 받은 문의답글 서버에 저장
app.post("/reply", (req, res) => {
  const { boardKey, reply } = req.body;
  const adminKey = 1; // 관리자키 임의로 1로 지정
  const date = new Date().toISOString(); // 현재 날짜 및 시간

  // reply 테이블에 새로운 답글을 추가
  const sql = `INSERT INTO reply (boardKey, adminKey, date, reply) VALUES (?, ?, ?, ?)`;
  conn.query(sql, [boardKey, adminKey, date, reply], (error, results) => {
    if (error) {
      console.error("Error submitting reply:", error);
      res.status(500).json({ error: "server error" });
    } else {
      res.status(200).json({ message: "성공적으로 답글을 추가했습니다." });
    }
  });
});
// ================ Admin 페이지 관련 라우터 설정 ================ //

app.listen(port, () => {
  console.log(` ${port}번 포트에서 서버 실행중`);
});
