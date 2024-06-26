// server.js

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const { error } = require("console");
const userRoutes = require("./routes/userRoutes");
const conn = require("./database/db.js");
const port = 3001; //포트번호 설정
const axios = require("axios");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

// 세션 설정
app.use(
  session({
    // name:'sid', // 세션 이름
    secret: "mySecretKey", // 세션을 암호화하기 위한 비밀키
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // HTTPS를 통해서만 쿠키 전송
      maxAge: 1000 * 60 * 60 * 24, // 세션의 유효기간 (예: 1일)
    },
  })
);

// Proxy 설정

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/v1/search/book.json", {
      target: "https://openapi.naver.com",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/api", {
      target: "http://127.0.0.1:3000/",
      changeOrigin: true,
    })
  );
};

// user 라우트 연결
app.use("/api", userRoutes);

// ========================= customers ================================//
// 모든 회원 조회
app.get("/customers", (req, res) => {
  const sql = "select * from customers";
  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

//특정 회원 조회
app.get("/customers/:custKey", (req, res) => {
  const custKey = req.params.custKey;
  const sql = `SELECT * FROM customers WHERE custKey = ${custKey}`;
  conn.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching customer:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: "Customer not found" });
      } else {
        res.json(results[0]); // 첫 번째 고객 정보 반환
      }
    }
  });
});

// customer테이블의 userid가 userId인 행의 custKey 조회
app.get("/customers/userInfo/:userid", (req, res) => {
  const userid = req.params.userid;
  const sql = `SELECT custKey FROM customers WHERE userid = ${userid}`;
  conn.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching customer:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: "Customer not found" });
      } else {
        res.json(results[0]); // 첫 번째 고객 정보 반환
      }
    }
  });
});

// 특정회원 point, grade 업데이트
app.put("/updateCustomerPoint/:custKey", (req, res) => {
  const custKey = req.params.custKey;
  const updatedCustomerData = req.body;

  const { grade, point } = updatedCustomerData;

  const sql = `
    UPDATE customers
    SET
        grade = ?,
        point = ?
    WHERE custKey = ?
  `;

  conn.query(sql, [grade, point, custKey], (error, result) => {
    if (error) {
      console.error("Error updating customer:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Customer not found" });
      } else {
        res.json({ message: "Customer updated successfully" });
      }
    }
  });
});
//특정 회원 업데이트
app.put("/updateCustomers/:custKey", (req, res) => {
  const custKey = req.params.custKey;
  const updatedCustomerData = req.body;

  const {
    userid,
    email,
    userpwd,
    nickname,
    age,
    gender,
    contact,
    grade,
    point,
  } = updatedCustomerData;

  const sql = `
    UPDATE customers
    SET userid = ?,
        email = ?,
        userpwd = ?,
        nickname = ?,
        age = ?,
        gender = ?,
        contact = ?,
        grade = ?,
        point = ?
    WHERE custKey = ?
  `;

  conn.query(
    sql,
    [
      userid,
      email,
      userpwd,
      nickname,
      age,
      gender,
      contact,
      grade,
      point,
      custKey,
    ],
    (error, result) => {
      if (error) {
        console.error("Error updating customer:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: "Customer not found" });
        } else {
          res.json({ message: "Customer updated successfully" });
        }
      }
    }
  );
});
// ========================= customers ================================//

// ========================= buyers ================================//
// 책 구매 희망 추가
app.post("/buyerbook", (req, res) => {
  const { custKey, itemTitle, author, publisher, itemImg, expiry, category } =
    req.body;
  const sql =
    "INSERT INTO buyerBook (custKey, itemTitle, author, publisher, itemImg, expiry,category) VALUES (?,?, ?, ?, ?, ?, ?)";
  conn.query(
    sql,
    [custKey, itemTitle, author, publisher, itemImg, expiry, category],
    (error, result) => {
      if (error) return res.json(error);
      return res.json({
        message: "책 구매 희망이 추가되었습니다.",
        id: result.insertId,
      });
    }
  );
});

// 모든 구매 희망 도서 조회 (Read)
app.get("/buyerbook", (req, res) => {
  const sql = "select * from buyerbook";
  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 특정 사용자의 구매 희망 도서 조회 (Read)
app.get("/buyerbook/:custKey", (req, res) => {
  const custKey = req.params.custKey;
  const sql = `SELECT * FROM buyerbook WHERE custKey = ${custKey}`;
  conn.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching customer:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: "Customer not found" });
      } else {
        res.json(results);
      }
    }
  });
});
// 카테고리별 구매 희망 도서 조회 (Read)
app.get("/buyerbook/category/:category", (req, res) => {
  const category = req.params.category;
  const sql = `SELECT * FROM buyerbook WHERE category = ? `;
  conn.query(sql, [category], (error, results) => {
    if (error) {
      console.error("Error fetching customer:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: "Customer not found" });
      } else {
        res.json(results);
      }
    }
  });
});

// 특정 구매 희망 도서 조회 (Read)
app.get("/buyerbook/item/:itemBuyKey", (req, res) => {
  const itemBuyKey = req.params.itemBuyKey;
  const sql = `SELECT * FROM buyerbook WHERE itemBuyKey = ?`;
  conn.query(sql, [itemBuyKey], (error, results) => {
    if (error) {
      console.error("Error fetching customer:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: "Customer not found" });
      } else {
        res.json(results);
      }
    }
  });
});
// 책 구매 희망 수정
app.put("/buyerbook/:itemBuyKey", (req, res) => {
  const itemBuyKey = req.params.itemBuyKey;
  const { itemTitle, author, publisher, itemImg, expiry, aucStatus } = req.body;
  const sql =
    "UPDATE buyerBook SET itemTitle = ?, author = ?, publisher = ?, itemImg = ?, expiry = ?, aucStatus = ?, category = ? WHERE itemBuyKey = ?";
  conn.query(
    sql,
    [
      itemTitle,
      author,
      publisher,
      itemImg,
      expiry,
      aucStatus,
      itemBuyKey,
      category,
    ],
    (error, result) => {
      if (error) return res.json(error);
      if (result.affectedRows === 0) {
        return res.json({ message: "해당 책 구매 희망이 없습니다." });
      }
      return res.json({
        message: "책 구매 희망이 수정되었습니다.",
        id: itemBuyKey,
      });
    }
  );
});
app.put("/buyerbook/aucStatus/:itemBuyKey", (req, res) => {
  const itemBuyKey = req.params.itemBuyKey;
  const { aucStatus } = req.body;
  const sql = "UPDATE buyerBook SET aucStatus = ? WHERE itemBuyKey = ?";
  conn.query(sql, [aucStatus, itemBuyKey], (error, result) => {
    if (error) return res.json(error);
    if (result.affectedRows === 0) {
      return res.json({ message: "해당 책 구매 희망이 없습니다." });
    }
    return res.json({
      message: "aucStatus가 수정되었습니다.",
      id: itemBuyKey,
    });
  });
});

// 책 구매 희망 삭제
app.delete("/buyerbook/:itemBuyKey", (req, res) => {
  const itemBuyKey = req.params.itemBuyKey;
  const sql = "DELETE FROM buyerBook WHERE itemBuyKey = ?";
  conn.query(sql, [itemBuyKey], (error, result) => {
    if (error) return res.json(error);
    if (result.affectedRows === 0) {
      return res.json({ message: "해당 책 구매 희망이 없습니다." });
    }
    return res.json({
      message: "책 구매 희망이 삭제되었습니다.",
      id: itemBuyKey,
    });
  });
});

// ========================= buyers ================================//

// ========================= seller ================================//
// 판매 희망 책 추가
app.post("/sellerbook", (req, res) => {
  const { itemBuyKey, custKey, sellerKey, damage, dateEnroll, price } =
    req.body;
  const sql =
    "INSERT INTO SellerBook (itemBuyKey, custKey, sellerKey, damage, dateEnroll, price) VALUES (?, ?, ?, ?, ?, ?)";
  conn.query(
    sql,
    [itemBuyKey, custKey, sellerKey, damage, dateEnroll, price],
    (error, result) => {
      if (error) return res.json(error);
      return res.json({
        message: "판매 희망 책이 추가되었습니다.",
        id: result.insertId,
      });
    }
  );
});

// 모든 판매 희망 책 조회
app.get("/sellerbook", (req, res) => {
  const sql = "select * from Sellerbook";
  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 특정 판매자의 판매 희망 책 조회
app.get("/sellerbook/seller/:sellerKey", (req, res) => {
  const sellerKey = req.params.sellerKey;
  const sql = "SELECT * FROM SellerBook WHERE sellerKey = ?";
  conn.query(sql, [sellerKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});
// 특정 itemBuyKey를 통한 조회
app.get("/sellerbook/item/:itemBuyKey", (req, res) => {
  const itemBuyKey = req.params.itemBuyKey;
  const sql = "SELECT * FROM SellerBook WHERE itemBuyKey = ?";
  conn.query(sql, [itemBuyKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});
// 특정 itemSellKey를 통한 조회
app.get("/sellerbook/item/sell/:itemSellKey", (req, res) => {
  const itemSellKey = req.params.itemSellKey;
  const sql = "SELECT * FROM SellerBook WHERE itemSellKey = ?";
  conn.query(sql, [itemSellKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 특정 itemSellKey 와 itemBuyKey를 모두 만족하는 값 조회
app.get("/sellerbook/sellbuy/:itemSellKey/:itemBuyKey", (req, res) => {
  const itemSellKey = req.params.itemSellKey;
  const itemBuyKey = req.params.itemBuyKey;
  const sql =
    "SELECT * FROM SellerBook WHERE itemSellKey = ? AND itemBuyKey = ?";
  conn.query(sql, [itemSellKey, itemBuyKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 특정 구매자의 구매 희망 책에 대한 판매 희망 책 조회
app.get("/sellerbook/buyer/:custKey", (req, res) => {
  const custKey = req.params.custKey;
  const sql = "SELECT * FROM SellerBook WHERE custKey = ?";
  conn.query(sql, [custKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 판매 희망 책 조회
app.get("/sellerbook/orders/:itemSellKey", (req, res) => {
  const sellerKey = req.params.itemSellKey;
  const sql = "SELECT * FROM SellerBook WHERE itemSellKey = ?";
  conn.query(sql, [sellerKey], (error, results) => {
    if (error) {
      console.error("Error fetching customer:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: "Customer not found" });
      } else {
        res.json(results);
      }
    }
  });
});

// 판매 희망 책 수정
app.put("/sellerbook/:itemSellKey", (req, res) => {
  const itemSellKey = req.params.itemSellKey;
  const { itemBuyKey, custKey, sellerKey, damage, dateEnroll, price } =
    req.body;
  const sql =
    "UPDATE SellerBook SET itemBuyKey = ?, custKey = ?, sellerKey = ?, damage = ?, dateEnroll = ?, price = ? WHERE itemSellKey = ?";
  conn.query(
    sql,
    [itemBuyKey, custKey, sellerKey, damage, dateEnroll, price, itemSellKey],
    (error, result) => {
      if (error) return res.json(error);
      if (result.affectedRows === 0) {
        return res.json({ message: "해당 판매 희망 책이 없습니다." });
      }
      return res.json({
        message: "판매 희망 책이 수정되었습니다.",
        id: itemSellKey,
      });
    }
  );
});

// 판매 희망 책 삭제
app.delete("/sellerbook/:itemSellKey", (req, res) => {
  const itemSellKey = req.params.itemSellKey;
  const sql = "DELETE FROM SellerBook WHERE itemSellKey = ?";
  conn.query(sql, [itemSellKey], (error, result) => {
    if (error) return res.json(error);
    if (result.affectedRows === 0) {
      return res.json({ message: "해당 판매 희망 책이 없습니다." });
    }
    return res.json({
      message: "판매 희망 책이 삭제되었습니다.",
      id: itemSellKey,
    });
  });
});

// ========================= seller ================================//

// ========================= address ================================//
// 주소 추가
app.post("/address", (req, res) => {
  const { custKey, name, tel, postcode, addr, addrDetail, defaultAddr } =
    req.body;
  const sql =
    "INSERT INTO address (custKey, name, tel, postcode, addr, addrDetail, defaultAddr) VALUES (?, ?, ?, ?, ?, ?, ?)";
  conn.query(
    sql,
    [custKey, name, tel, postcode, addr, addrDetail, defaultAddr],
    (error, result) => {
      if (error) return res.json(error);
      return res.json({
        message: "주소가 추가되었습니다.",
        id: result.insertId,
      });
    }
  );
});

// 모든 주소 조회
app.get("/address", (req, res) => {
  const sql = "select * from address";
  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});
// 특정 고객의 주소 조회
app.get("/address/:custKey", (req, res) => {
  const custKey = req.params.custKey;
  const sql = "SELECT * FROM address WHERE custKey = ?";
  conn.query(sql, [custKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 주소 수정
app.put("/address/:addrKey", (req, res) => {
  const addrKey = req.params.addrKey;
  const { custKey, name, tel, postcode, addr, addrDetail, defaultAddr } =
    req.body;
  const sql =
    "UPDATE address SET custKey = ?, name = ?, tel = ?, postcode = ?, addr = ?, addrDetail = ?, defaultAddr = ? WHERE addrKey = ?";
  conn.query(
    sql,
    [custKey, name, tel, postcode, addr, addrDetail, defaultAddr, addrKey],
    (error, result) => {
      if (error) return res.json(error);
      if (result.affectedRows === 0) {
        return res.json({ message: "해당 주소가 없습니다." });
      }
      return res.json({ message: "주소가 수정되었습니다.", id: addrKey });
    }
  );
});

// 주소 삭제
app.delete("/address/:addrKey", (req, res) => {
  const addrKey = req.params.addrKey;
  const sql = "DELETE FROM address WHERE addrKey = ?";
  conn.query(sql, [addrKey], (error, result) => {
    if (error) return res.json(error);
    if (result.affectedRows === 0) {
      return res.json({ message: "해당 주소가 없습니다." });
    }
    return res.json({ message: "주소가 삭제되었습니다.", id: addrKey });
  });
});

// ========================= address ================================//

// ========================= enquiry ================================//
// 문의 추가
app.post("/enquiries", (req, res) => {
  const { custKey, boardTitle, Enquiry } = req.body;
  const sql =
    "INSERT INTO enquiry (custKey, boardTitle, Enquiry) VALUES (?, ?, ?)";
  conn.query(sql, [custKey, boardTitle, Enquiry], (error, result) => {
    if (error) return res.json(error);
    console.log(custKey, boardTitle, Enquiry);
    return res.json({
      message: "문의가 추가되었습니다.",
      id: result.insertId,
    });
  });
});

// 모든 문의 조회 -- 문의 시간 format
app.get("/enquiries", (req, res) => {
  const sql = `
  select 
  DATE_FORMAT(dateEnquiry, '%Y-%m-%d') AS date,
  boardKey,
  custKey,
  boardTitle,
  Enquiry
  from enquiry
  `;
  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 특정 고객 문의 조회
app.get("/enquiries/:custKey", (req, res) => {
  const custKey = req.params.custKey;
  const sql = "SELECT * FROM enquiry WHERE custKey = ?";
  conn.query(sql, [custKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 문의 수정
app.put("/enquiries/:boardKey", (req, res) => {
  const boardKey = req.params.boardKey;
  const { custKey, dateEnquiry, boardTitle, enquiry } = req.body;
  const sql =
    "UPDATE enquiry SET custKey = ?, dateEnquiry = ?, boardTitle = ?, Enquiry = ? WHERE boardKey = ?";
  conn.query(
    sql,
    [custKey, dateEnquiry, boardTitle, enquiry, boardKey],
    (error, result) => {
      if (error) return res.json(error);
      if (result.affectedRows === 0) {
        return res.json({ message: "해당 문의가 없습니다." });
      }
      return res.json({ message: "문의가 수정되었습니다.", id: boardKey });
    }
  );
});

// 문의 삭제
app.delete("/enquiries/:boardKey", (req, res) => {
  const boardKey = req.params.boardKey;
  const sql = "DELETE FROM enquiry WHERE boardKey = ?";
  conn.query(sql, [boardKey], (error, result) => {
    if (error) return res.json(error);
    if (result.affectedRows === 0) {
      return res.json({ message: "해당 문의가 없습니다." });
    }
    return res.json({ message: "문의가 삭제되었습니다.", id: boardKey });
  });
});

// ========================= enquiry ================================//

// ========================= order ================================//
// 주문 추가
app.post("/orders", (req, res) => {
  const {
    itemSellKey,
    custKey,
    sellerKey,
    price,
    name,
    tel,
    postcode,
    addr,
    addrDetail,
    status,
    dateBuy,
  } = req.body;
  const sql =
    "INSERT INTO orders (itemSellKey, custKey, sellerKey, price, name, tel, postcode, addr, addrDetail, status, dateBuy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  conn.query(
    sql,
    [
      itemSellKey,
      custKey,
      sellerKey,
      price,
      name,
      tel,
      postcode,
      addr,
      addrDetail,
      status,
      dateBuy,
    ],
    (error, result) => {
      if (error) return res.json(error);
      return res.json({
        message: "주문이 추가되었습니다.",
        id: result.insertId,
      });
    }
  );
});

// 모든 주문 조회
app.get("/orders", (req, res) => {
  const sql = "select * from orders";
  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 날짜별 주문 요약
app.get("/orders/summary", (req, res) => {
  const sql = `
    SELECT
      DATE_FORMAT(dateBuy, '%Y-%m-%d') AS date,
      COUNT(*) AS orderCount,
      SUM(price) AS totalSales
    FROM
      orders
    GROUP BY
      dateBuy
    ORDER BY
      dateBuy DESC
  `;

  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 특정 구매자의 주문 조회
app.get("/orders/customer/:custKey", (req, res) => {
  const custKey = req.params.custKey;
  const sql = "SELECT * FROM orders WHERE custKey = ?";
  conn.query(sql, [custKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 특정 판매자의 주문 조회
app.get("/orders/seller/:sellerKey", (req, res) => {
  const sellerKey = req.params.sellerKey;
  const sql = "SELECT * FROM orders WHERE sellerKey = ?";
  conn.query(sql, [sellerKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 특정 판매자의 낙찰
app.get("/orders/customer/sell/:sellerKey", (req, res) => {
  const sellerKey = req.params.sellerKey;
  const sql = `
  SELECT BuyerBook.*
    FROM SellerBook
    INNER JOIN BuyerBook ON SellerBook.itemBuyKey = BuyerBook.itemBuyKey
    INNER JOIN orders ON SellerBook.itemSellKey = orders.itemSellKey
    WHERE orders.sellerKey = ?
    ORDER BY orders.itemKey DESC
  `;
  conn.query(sql, [sellerKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});


// 특정 판매희망도서 주문 조회
app.get("/orders/sellkey/:itemSellKey", (req, res) => {
  const itemSellKey = req.params.itemSellKey;
  const sql = "SELECT * FROM orders WHERE itemSellKey = ?";
  conn.query(sql, [itemSellKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 주문 삭제
app.delete("/orders/:itemKey", (req, res) => {
  const itemKey = req.params.itemKey;
  const sql = "DELETE FROM orders WHERE itemKey = ?";
  conn.query(sql, [itemKey], (error, result) => {
    if (error) return res.json(error);
    if (result.affectedRows === 0) {
      return res.json({ message: "해당 주문이 없습니다." });
    }
    return res.json({ message: "주문이 삭제되었습니다.", id: itemKey });
  });
});

const getOrdersByCustomer = (custKey) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT orders.*, SellerBook.sellerKey
      FROM orders
      JOIN SellerBook ON orders.itemSellKey = SellerBook.itemSellKey
      WHERE orders.custKey = ?
    `;
    conn.query(sql, [custKey], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// 특정 구매자의 주문 조회
app.get("/orders/customer/:custKey", async (req, res) => {
  const custKey = req.params.custKey;
  try {
    const orders = await getOrdersByCustomer(custKey);
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ========================= order ================================//
// ========================= review ================================//
// 리뷰 추가
app.post("/reviews", (req, res) => {
  const { itemKey, custKey, sellerKey, satisfaction, repurchase, review } =
    req.body;
  const sql =
    "INSERT INTO review (itemKey, custKey, sellerKey, satisfaction, repurchase, review) VALUES (?, ?, ?, ?, ?, ?)";
  conn.query(
    sql,
    [itemKey, custKey, sellerKey, satisfaction, repurchase, review],
    (error, result) => {
      if (error) return res.json(error);
      return res.json({
        message: "리뷰가 추가되었습니다.",
        id: result.insertId,
      });
    }
  );
});

// 모든 리뷰 조회
app.get("/reviews", (req, res) => {
  const sql = "select * from review";
  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 특정 상품의 리뷰 조회
app.get("/reviews/item/:itemKey", (req, res) => {
  const itemKey = req.params.itemKey;
  const sql = "SELECT * FROM review WHERE itemKey = ?";
  conn.query(sql, [itemKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});
// 특정 구매자의 리뷰 조회
app.get("/reviews/customer/:custKey", (req, res) => {
  const custKey = req.params.custKey;
  const sql = "SELECT * FROM review WHERE custKey = ?";
  conn.query(sql, [custKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 특정 판매자의 리뷰 조회
app.get("/reviews/seller/:sellerKey", (req, res) => {
  const sellerKey = req.params.sellerKey;
  const sql = "SELECT * FROM review WHERE sellerKey = ?";
  conn.query(sql, [sellerKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 리뷰 삭제
app.delete("/reviews/:reviewKey", (req, res) => {
  const reviewKey = req.params.reviewKey;
  const sql = "DELETE FROM review WHERE reviewKey = ?";
  conn.query(sql, [reviewKey], (error, result) => {
    if (error) return res.json(error);
    if (result.affectedRows === 0) {
      return res.json({ message: "해당 리뷰가 없습니다." });
    }
    return res.json({ message: "리뷰가 삭제되었습니다.", id: reviewKey });
  });
});

// ========================= review ================================//

// ========================= reply ================================//
// enquiry.js에서 받은 문의답글 서버에 저장
app.post("/reply", (req, res) => {
  const { boardKey, reply } = req.body;
  const adminKey = 1; // 관리자키 임의로 1로 지정

  // reply 테이블에 새로운 답글을 추가
  const sql = `INSERT INTO reply (boardKey, adminKey, reply) VALUES (?, ?, ?)`;
  conn.query(sql, [boardKey, adminKey, reply], (error, results) => {
    if (error) {
      console.error("Error submitting reply:", error);
      res.status(500).json({ error: "server error" });
    } else {
      res.status(200).json({ message: "성공적으로 답글을 추가했습니다." });
    }
  });
});

app.delete("/reply/:replyKey", (req, res) => {
  const replyKey = req.params.replyKey;

  // replyKey에 해당하는 답글을 삭제합니다.
  const sql = "DELETE FROM reply WHERE replyKey = ?";
  conn.query(sql, [replyKey], (error, result) => {
    if (error) {
      console.error("Error deleting reply:", error);
      return res.status(500).json({ error: "서버 오류" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "해당 답글을 찾을 수 없습니다." });
    }
    return res
      .status(200)
      .json({ message: "답글이 성공적으로 삭제되었습니다." });
  });
});

//모든 답글 가져오기
app.get("/reply", (req, res) => {
  const sql = "select * from reply";
  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 해당 문의에 대한 답글
app.get("/reply/:boardKey", (req, res) => {
  const boardKey = req.params.boardKey;
  const sql = `
  select 
  DATE_FORMAT(dateReply, '%Y-%m-%d') AS date,
  replyKey,
  boardKey,
  adminKey,
  reply
  from reply
  where
  boardKey = ?
  `;
  // const sql = "SELECT * FROM reply WHERE boardKey = ?";
  conn.query(sql, [boardKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// ========================= reply ================================//

// 특정 사용자의 구매 희망 도서 등록 중 판매글이 달린 것 조회
app.get("/customers/bells/:custKey", (req, res) => {
  const custKey = req.params.custKey;
  const sql = `SELECT BuyerBook.*
              FROM (
                  SELECT *
                  FROM BuyerBook
                  WHERE custKey = ${custKey}
              ) AS BuyerBook
              INNER JOIN (
                  SELECT *
                  FROM SellerBook
                  ORDER BY itemSellKey
              ) AS SortedSellerBook ON BuyerBook.ItemBuyKey = SortedSellerBook.ItemBuyKey
              ORDER BY SortedSellerBook.itemSellKey DESC;
              `;
  conn.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching customer:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: "Customer not found" });
      } else {
        res.json(results);
      }
    }
  });
});

// ========================= bookSearch ==========================//

const client_id = process.env.Client_ID;
const client_secret = process.env.Client_Secret;
app.get("/Mypage/search/book", async function (req, res) {
  try {
    console.log("Received request from client:", req.query);

    const api_url =
      "https://openapi.naver.com/v1/search/book?query=" +
      encodeURIComponent(req.query.query);
    console.log("api_url", api_url);
    const display = req.query.display || 100; // 100개 정렬

    const response = await axios.get(api_url, {
      params: {
        display,
      },

      headers: {
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).end();
  }
});

// ========================= bookSearch ==========================//

app.listen(port, () => {
  console.log(` ${port}번 포트에서 서버 실행중`);
});

// ====================== 기한 넘으면 기한 만료 상태로 바꿔주는 동작 =====================//
const cron = require("node-cron");

//cron.schedule('*/1 * * * *', async () => { // 동작 확인 위해 매분 실행되게 설정한 부분
cron.schedule("0 0 * * *", async () => {
  // 매일 0시에 실행되도록
  try {
    // 현재 날짜 가져오기
    const currentDate = new Date();

    // 현재 날짜보다 expiry가 이전인 buyerbook의 aucStatus를 3으로 업데이트
    // aucStatus가 진행중(2)인것을 만료(3)로 업데이트 (낙찰(1)은 바꾸면 안됨)
    await conn.query(
      "UPDATE buyerbook SET aucStatus = 3 WHERE STR_TO_DATE(expiry, '%Y%m%d') < CURRENT_DATE() AND aucStatus = 2"
    );

    console.log("Expiry 업데이트 완료");
  } catch (error) {
    console.error("Expiry 업데이트 중 오류 발생:", error);
  }
});
