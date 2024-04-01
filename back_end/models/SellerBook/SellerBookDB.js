const db = require("../../database/db");

// 책 판매 정보 생성 (Create)
exports.createSellerBook = (sellerBookData) => {
  return new Promise((resolve, reject) => {
    const { itemBuyKey, custKey, sellerKey, damage, dateEnroll, price } =
      sellerBookData;
    db.query(
      "INSERT INTO SellerBook (itemBuyKey, custKey, sellerKey, damage, dateEnroll, price) VALUES (?, ?, ?, ?, ?, ?)",
      [itemBuyKey, custKey, sellerKey, damage, dateEnroll, price],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 모든 책 판매 정보 조회 (Read)
exports.getAllSellerBooks = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM SellerBook", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// 특정 사용자의 판매 정보 조회 (Read)
exports.getSellerBooksByUser = (custKey) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM SellerBook WHERE sellerKey = ?",
      custKey,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 책 판매 정보 업데이트 (Update)
exports.updateSellerBook = (itemSellKey, updatedSellerBookData) => {
  return new Promise((resolve, reject) => {
    const { damage, dateEnroll, price } = updatedSellerBookData;
    db.query(
      "UPDATE SellerBook SET damage = ?, dateEnroll = ?, price = ? WHERE itemSellKey = ?",
      [damage, dateEnroll, price, itemSellKey],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 책 판매 정보 삭제 (Delete)
exports.deleteSellerBook = (itemSellKey) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM SellerBook WHERE itemSellKey = ?",
      itemSellKey,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};
