const db = require("../../database/db");

// 문의 생성 (Create)
exports.createEnquiry = (enquiryData) => {
  return new Promise((resolve, reject) => {
    const { custKey, dateEnquiry, boardTitle, Enquiry } = enquiryData;
    db.query(
      "INSERT INTO enquiry (custKey, dateEnquiry, boardTitle, Enquiry) VALUES (?, ?, ?, ?)",
      [custKey, dateEnquiry, boardTitle, Enquiry],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 모든 문의 조회 (Read)
exports.getAllEnquiries = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM enquiry", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// 특정 사용자의 모든 문의 조회 (Read)
exports.getUserEnquiries = (custKey) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM enquiry WHERE custKey = ?",
      custKey,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 문의 업데이트 (Update)
exports.updateEnquiry = (boardKey, updatedEnquiryData) => {
  return new Promise((resolve, reject) => {
    const { dateEnquiry, boardTitle, Enquiry } = updatedEnquiryData;
    db.query(
      "UPDATE enquiry SET dateEnquiry = ?, boardTitle = ?, Enquiry = ? WHERE boardKey = ?",
      [dateEnquiry, boardTitle, Enquiry, boardKey],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 문의 삭제 (Delete)
exports.deleteEnquiry = (boardKey) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM enquiry WHERE boardKey = ?",
      boardKey,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};
