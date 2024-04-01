const db = require("../../database/db");

// 구매 희망 도서 생성 (Create)
exports.createBuyerBook = (buyerBookData) => {
  return new Promise((resolve, reject) => {
    const {
      custKey,
      itemTitle,
      author,
      publisher,
      itemImg,
      expiry,
      aucStatus,
    } = buyerBookData;
    db.query(
      "INSERT INTO buyerBook (custKey, itemTitle, author, publisher, itemImg, expiry, aucStatus) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [custKey, itemTitle, author, publisher, itemImg, expiry, aucStatus],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 모든 구매 희망 도서 조회 (Read)
exports.getAllBuyerBooks = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM buyerBook", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// 특정 사용자의 구매 희망 도서 조회 (Read)
exports.getBuyerBooksByUser = (custKey) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM buyerBook WHERE custKey = ?",
      custKey,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 구매 희망 도서 정보 업데이트 (Update)
exports.updateBuyerBook = (itemBuyKey, updatedBuyerBookData) => {
  return new Promise((resolve, reject) => {
    const { itemTitle, author, publisher, itemImg, expiry, aucStatus } =
      updatedBuyerBookData;
    db.query(
      "UPDATE buyerBook SET itemTitle = ?, author = ?, publisher = ?, itemImg = ?, expiry = ?, aucStatus = ? WHERE itemBuyKey = ?",
      [itemTitle, author, publisher, itemImg, expiry, aucStatus, itemBuyKey],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 구매 희망 도서 정보 삭제 (Delete)
exports.deleteBuyerBook = (itemBuyKey) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM buyerBook WHERE itemBuyKey = ?",
      itemBuyKey,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};
