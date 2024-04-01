const db = require("../../database/db");

// 리뷰 생성 (Create)
exports.createReview = (reviewData) => {
  return new Promise((resolve, reject) => {
    const { itemKey, custKey, sellerKey, satisfaction, repurchase, review } =
      reviewData;
    db.query(
      "INSERT INTO review (itemKey, custKey, sellerKey, satisfaction, repurchase, review) VALUES (?, ?, ?, ?, ?, ?)",
      [itemKey, custKey, sellerKey, satisfaction, repurchase, review],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 모든 리뷰 조회 (Read)
exports.getAllReviews = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM review", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// 특정 사용자의 모든 리뷰 조회 (Read)
exports.getUserReviews = (custKey) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM review WHERE custKey = ?",
      custKey,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 리뷰 업데이트 (Update)
exports.updateReview = (reviewKey, updatedReviewData) => {
  return new Promise((resolve, reject) => {
    const { satisfaction, repurchase, review } = updatedReviewData;
    db.query(
      "UPDATE review SET satisfaction = ?, repurchase = ?, review = ? WHERE reviewKey = ?",
      [satisfaction, repurchase, review, reviewKey],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 리뷰 삭제 (Delete)
exports.deleteReview = (reviewKey) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM review WHERE reviewKey = ?",
      reviewKey,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};
