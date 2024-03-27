// user.js
const bcrypt = require("bcrypt");
const userDB = require("../models/userDB");

// 텍스트 값을 hash로 변환
const textToHash = async (text) => {
  // 해시 생성에 사용될 saltRounds 값을 정의
  const saltRounds = 10;

  try {
    // bcrypt 모듈을 사용하여 텍스트를 해시로 변환
    const hash = await bcrypt.hash(text, saltRounds);
    // 생성된 해시를 반환
    return hash;
  } catch (err) {
    // 오류가 발생하면 콘솔에 오류를 기록하고 오류를 반환
    console.error(err);
    return err;
  }
};

// 사용자 가입을 처리하는 함수
exports.signup = async (req, res) => {
  // 요청에서 필요한 사용자 정보를 추출
  const {
    userid,
    userpwd,
    email,
    nickname,
    age,
    gender,
    // contact,
    // grade,
    // point,
  } = req.body;

  try {
    // 이미 해당 사용자 ID로 가입된 사용자가 있는지 확인
    const getUser = await userDB.getUser(userid);
    if (getUser.length) {
      // 사용자가 이미 존재하는 경우 401 상태 코드와 메시지를 반환
      res.status(401).json("이미 존재하는 아이디입니다.");
      return;
    }
    // 사용자 비밀번호를 해시로 변환
    const hash = await textToHash(userpwd);
    // 사용자 정보를 DB에 추가
    const signUp = await userDB.signUp([
      userid,
      hash,
      email,
      nickname,
      age,
      gender,
      // contact,
      // grade,
      // point,
    ]);
    // 가입이 성공적으로 완료되면 200 상태 코드와 성공 메시지를 반환
    res.status(200).json("가입 성공");
  } catch (err) {
    // 오류가 발생하면 콘솔에 오류를 기록하고 500 상태 코드와 오류를 반환
    console.error(err);
    res.status(500).json(err);
  }
};
