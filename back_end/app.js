// 필요한 모듈 및 미들웨어 가져오기
const express = require("express"); // Express.js 웹 애플리케이션 구축을 위한 모듈
const morgan = require("morgan"); // HTTP 요청 로깅을 위한 Morgan 미들웨어
const cookiParser = require("cookie-parser"); // 쿠키 파싱 미들웨어
const session = require("express-session"); // 세션 관리를 위한 Express 세션 미들웨어
const dotenv = require("dotenv"); // 환경 변수 관리를 위한 dotenv 모듈
// .env 파일에서 환경 변수 로드

dotenv.config(); // dotenv를 초기화하여 환경 변수 로드
const app = express(); // Express 애플리케이션의 인스턴스 생성
app.set("port", process.env.PORT || 3000);
// 서버의 포트를 환경 변수 PORT로 설정하거나 기본값으로 3000으로 설정

app.use(morgan("dev")); // Morgan 미들웨어를 'dev' 형식으로 사용하여 요청 로깅
app.use("/", express.static(path.join(__dirname, "public")));
// 루트 URL("/")에서 'public' 디렉토리의 정적 파일 제공
app.use(express.json()); // 들어오는 JSON 요청을 파싱
app.use(express.urlencoded({ extended: false })); // 들어오는 URL-encoded 요청을 파싱
app.use(cookiParser(process.env.COOKIE_SECRET)); // 제공된 시크릿을 사용하여 쿠키 파싱
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);
// 지정된 구성으로 세션 미들웨어 설정

app.use((req, res, next) => {
  console.log("모든 요청은 이 미들웨어를 거칩니다.");
});
// 모든 들어오는 요청에 대한 메시지를 로깅하는 미들웨어

app.get("/", (req, res) => {
  res.send("안녕, 익스프레스");
});
/* 루트 URL("/")에 대한 라우트 정의: GET 요청에 대해 "안녕, 익스프레스"로 응답 */

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
// 서버 시작 및 지정된 포트에서 대기, 서버가 준비되면 메시지를 로깅
