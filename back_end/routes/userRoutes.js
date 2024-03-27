// userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user"); // 유저 컨트롤러 가져오기
const businessLogic = require("../models/userDB"); // 비지니스 로직

// 라우트 설정
router.post("/signup", userController.signup); // 회원가입 부분
router.post("/loginCheck", businessLogic.loginCheck); // 로그인 부분
router.post("/checkEmailDuplicate", businessLogic.checkEmailDuplicate); // 이메일 중복확인
router.get("/logout", businessLogic.logout); // 로그아웃 부분

module.exports = router;
