// user.js
const bcrypt = require("bcrypt");
const userDB = require("../models/userDB");

const textToHash = async (text) => {
  // 텍스트 값을 hash로 변환
  const saltRounds = 10;

  try {
    const hash = await bcrypt.hash(text, saltRounds);
    return hash;
  } catch (err) {
    console.error(err);
    return err;
  }
};

exports.signup = async (req, res) => {
  const {
    userid,
    userpwd,
    email,
    nickname,
    age,
    gender,
    contact,
    grade,
    point,
  } = req.body;

  try {
    const getUser = await userDB.getUser(userid);
    if (getUser.length) {
      res.status(401).json("이미 존재하는 아이디입니다.");
      return;
    }

    const hash = await textToHash(userpwd);
    const signUp = await userDB.signUp([
      userid,
      hash,
      email,
      nickname,
      age,
      gender,
      contact,
      grade,
      point,
    ]);
    res.status(200).json("가입 성공");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const hashCompare = async (inputValue, hash) => {
  try {
    const isMatch = await bcrypt.compare(inputValue, hash);
    if (isMatch) return true;
    else return false;
  } catch (err) {
    console.error(err);
    return err;
  }
};

exports.loginCheck = async (req, res) => {
  const { userid, userpwd } = req.body;

  try {
    const getUser = await userDB.getUser(userid);
    if (!getUser.length) {
      res.status(401).json("존재하지 않는 아이디입니다.");
      return;
    }

    const blobToStr = Buffer.from(getUser[0].userpwd).toString();
    const isMatch = await hashCompare(userpwd, blobToStr);

    if (!isMatch) {
      res.status(401).json("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 로그인 성공 시 세션에 사용자 정보 저장
    req.session.userid = userid;
    req.session.user = getUser[0]; // 필요한 경우 사용자 정보의 일부만 저장 가능
    res.status(200).json("로그인 성공");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.logout = (req, res) => {
  // 세션에서 사용자 정보 삭제
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json("로그아웃 실패");
      return;
    }
    res.clearCookie("connect.sid"); // 세션 쿠키 삭제 (이름)

    // 모든 쿠키의 값을 "0"으로 변경
    // const cookies = req.cookies;
    // for (const cookieName in cookies) {
    //   res.cookie(cookieName, "0", { maxAge: 0 });
    // }
    res.status(200).json("로그아웃 성공");
  });
};
