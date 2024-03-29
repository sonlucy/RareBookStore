const db = require("../database/db.js"); // 데이터베이스 연결 설정
const bcrypt = require("bcrypt");

// 특정 사용자를 가져오는 함수
exports.getAdminUser = (userid) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM admin where userid = ?`, userid, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
// 입력된 비밀번호와 해시된 비밀번호를 비교하는 함수
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
// 사용자 로그인을 확인하는 함수
exports.adminloginCheck = async (req, res) => {
  const { userid, userpwd } = req.body;

  try {
    // 해당 사용자 정보 가져옴
    const getUser = await exports.getAdminUser(userid);
    if (!getUser.length) {
      res.status(401).json("존재하지 않는 아이디입니다.");
      return;
    }
    // 해시된 비밀번호를 문자열로 변환
    const blobToStr = Buffer.from(getUser[0].userpwd).toString();
    // 입력된 비밀번호와 해시된 비밀번호를 비교
    const isMatch = await hashCompare(userpwd, blobToStr);

    if (!isMatch) {
      // 비밀번호가 일치하지 않으면 401 상태 코드와 메시지를 반환
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
