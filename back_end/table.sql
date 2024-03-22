CREATE TABLE `customers` (
    `custKey` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userid` VARCHAR(15) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `userpwd` VARCHAR(150) NOT NULL,
    `nickname` VARCHAR(15) NOT NULL,
    `age` INT,
    `gender` CHAR,
    `contact` INT(11) NOT NULL COMMENT '구매희망도서 등록시 사용',
    `grade` INT(2),
    `point` INT(3) DEFAULT 0 COMMENT '평균값(1등급:4~5점/2등급:3~4/3등급:2~3/4등급:1~2/5등급:0~1)'
);

CREATE TABLE `address` (
    `addrKey` INT NOT NULL PRIMARY KEY,
    `custKey` INT NOT NULL,
    `name` VARCHAR(15) NOT NULL,
    `tel` VARCHAR(15) NOT NULL,
    `postcode` VARCHAR(6) NOT NULL,
    `addr` VARCHAR(300) NOT NULL,
    `addrDetail` VARCHAR(100) NOT NULL,
    `default` CHAR DEFAULT 'N'
);

CREATE TABLE `order` (
    `itemKey` INT NOT NULL COMMENT 'PK(주문고유번호)',
    `itemSellKey` INT NOT NULL COMMENT 'FK(판매희망도서)',
    `itemBuyKey` INT NOT NULL COMMENT 'FK(구매희망도서)',
    `custKey` INT NOT NULL COMMENT '구매자',
    `sellerKey` INT NOT NULL COMMENT '판매자',
    `price` VARCHAR(10) NOT NULL,
    `name` VARCHAR(15) NOT NULL,
    `tel` VARCHAR(15) NOT NULL,
    `postcode` VARCHAR(6) NOT NULL,
    `addr` VARCHAR(300) NOT NULL,
    `addrDetail` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`itemKey`, `itemSellKey`, `itemBuyKey`, `custKey`, `sellerKey`),
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`),
    FOREIGN KEY (`sellerKey`) REFERENCES `customers` (`custKey`)
);

CREATE TABLE `SellerBook` (
    `itemSellKey` INT NOT NULL COMMENT 'PK(판매희망도서)',
    `itemBuyKey` INT NOT NULL COMMENT 'FK(구매희망도서)',
    `custKey` INT NOT NULL COMMENT '구매자',
    `sellerKey` INT NOT NULL COMMENT '판매자',
    `itemImg` VARCHAR(600) NOT NULL,
    `damage` INT NOT NULL COMMENT '체크리스트 갯수별 등급 (0:최상, 1:상, 2-3:중)',
    `date` VARCHAR(20) NOT NULL,
    `price` INT(8) NOT NULL COMMENT '판매희망가',
    PRIMARY KEY (`itemSellKey`, `itemBuyKey`, `custKey`, `sellerKey`),
    FOREIGN KEY (`itemBuyKey`) REFERENCES `buyerBook` (`itemBuyKey`),
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`),
    FOREIGN KEY (`sellerKey`) REFERENCES `customers` (`custKey`)
);

CREATE TABLE `enquiry` (
    `custKey` INT NOT NULL COMMENT 'FK(회원정보)',
    `boardKey` INT NOT NULL,
    `date` VARCHAR(20) NOT NULL COMMENT '질문:자동으로 들어오는 값 NULL or NOT NULL?',
    `boardTitle` VARCHAR(100) NOT NULL,
    `Enquiry` VARCHAR(400) NOT NULL,
    PRIMARY KEY (`custKey`, `boardKey`),
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`)
);

CREATE TABLE `admin` (
    `adminKey` INT NOT NULL PRIMARY KEY,
    `userid` VARCHAR(15) NOT NULL,
    `username` INT(15) NOT NULL,
    `userpwd` VARCHAR(150) NOT NULL
);

CREATE TABLE `buyerBook` (
    `itemBuyKey` INT NOT NULL COMMENT 'PK(구매희망도서)',
    `custKey` INT NOT NULL COMMENT '구매자',
    `itemTitle` VARCHAR(30) NOT NULL,
    `author` VARCHAR(20) NOT NULL,
    `publisher` VARCHAR(20) NOT NULL,
    `expiry` INT NOT NULL,
    `aucStatus` INT NOT NULL DEFAULT 0 COMMENT '낙찰(1)//진행중(2)/기한만료(3)/취소(삭제)',
    PRIMARY KEY (`itemBuyKey`, `custKey`),
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`)
);

CREATE TABLE `review` (
    `reviewKey` INT NOT NULL COMMENT '논의요망(필요한지?)',
    `sellKey2` INT NOT NULL COMMENT 'FK(판매자)',
    `itemKey2` INT NOT NULL COMMENT 'FK(주문)',
    `custKey` INT NOT NULL COMMENT '구매자',
    `sellerKey` INT NOT NULL COMMENT '판매자',
    `satisfaction` INT NOT NULL COMMENT '1~5점',
    `repurchase` INT NOT NULL COMMENT '1~5점',
    `review` VARCHAR(400) NULL,
    PRIMARY KEY (`reviewKey`, `sellKey2`, `itemKey2`, `custKey`, `sellerKey`),
    FOREIGN KEY (`itemKey2`) REFERENCES `order` (`itemKey`),
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`),
    FOREIGN KEY (`sellerKey`) REFERENCES `customers` (`custKey`)
);

CREATE TABLE `reply` (
    `replayKey` INT NOT NULL,
    `boardKey2` INT NOT NULL,
    `adminKey2` INT NOT NULL,
    `date` VARCHAR(20) NOT NULL,
    `reply` VARCHAR(400) NOT NULL,
    PRIMARY KEY (`replayKey`, `boardKey2`, `adminKey2`),
    FOREIGN KEY (`boardKey2`) REFERENCES `enquiry` (`boardKey`),
    FOREIGN KEY (`adminKey2`) REFERENCES `admin` (`adminKey`)
);

CREATE TABLE `sessions` (
  `session_id` VARCHAR(255) NOT NULL PRIMARY KEY,
  `custKey` INT NOT NULL,
  `expires` DATETIME NOT NULL,
  FOREIGN KEY (`custKey`) REFERENCES `customers`(`custKey`)
);
