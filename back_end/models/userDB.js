// userDB.js

const db = require("../database/db.js"); // 데이터베이스 연결 설정
const bcrypt = require("bcrypt");

// 사용자를 DB에 등록하는 함수
exports.signUp = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      // 사용자 정보를 customers 테이블에 삽입
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

// 특정 사용자를 가져오는 함수
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
exports.loginCheck = async (req, res) => {
  const { userid, userpwd } = req.body;

  try {
    // 해당 사용자 정보 가져옴
    const getUser = await exports.getUser(userid);
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

// exports.logout = (req, res) => {
//   // 세션에서 사용자 정보 삭제
//   req.session.destroy((err) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json("로그아웃 실패");
//       return;
//     }
//     res.clearCookie("connect.sid"); // 세션 쿠키 삭제 (이름)
//     res.status(200).json("로그아웃 성공");
//   });
// };
