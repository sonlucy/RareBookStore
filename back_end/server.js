// server.js

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();

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

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api", userRoutes); // user 라우트 연결

app.listen(3001, () => {
  console.log("서버 실행");
});
