const db = require("../../database/db");

// 주소 생성 (Create)
exports.createAddress = (addressData) => {
  return new Promise((resolve, reject) => {
    const { custKey, name, tel, postcode, addr, addrDetail, isDefault } =
      addressData;
    db.query(
      "INSERT INTO address (custKey, name, tel, postcode, addr, addrDetail, `default`) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [custKey, name, tel, postcode, addr, addrDetail, isDefault],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 모든 주소 조회 (Read)
exports.getAllAddresses = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM address", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// 특정 사용자의 모든 주소 조회 (Read)
exports.getUserAddresses = (custKey) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM address WHERE custKey = ?",
      custKey,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 주소 업데이트 (Update)
exports.updateAddress = (addrKey, updatedAddressData) => {
  return new Promise((resolve, reject) => {
    const { name, tel, postcode, addr, addrDetail, isDefault } =
      updatedAddressData;
    db.query(
      "UPDATE address SET name = ?, tel = ?, postcode = ?, addr = ?, addrDetail = ?, `default` = ? WHERE addrKey = ?",
      [name, tel, postcode, addr, addrDetail, isDefault, addrKey],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 주소 삭제 (Delete)
exports.deleteAddress = (addrKey) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM address WHERE addrKey = ?",
      addrKey,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};
