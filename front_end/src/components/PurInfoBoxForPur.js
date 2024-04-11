import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styled/PurInfoBox.css";
import useSellerNickname from "../hooks/api/useSellerNickname";

const PurInfoBoxForPur = ({ bookData, userInfo }) => {
  // console.log(bookData, "전달받은 bookData");
  // console.log(userInfo, "전달받은 userInfo");
  const sellerCustKey = bookData.sellerKey;
  const sellerNickName = useSellerNickname(sellerCustKey);
  return (
    <div className="yhw_purInfoBox">
      <Link to="/detail">
        <img src={userInfo.itemImg} alt="상품이미지" />
      </Link>
      <div className="yhw_purInfoTxt">
        <div className="yhw_purInfoTxtTop">
          <b>{userInfo.itemTitle}</b>
          <span className="yhw_purInfoWriterPub">
            {userInfo.author} | {userInfo.publisher}
          </span>
          <span className="yhw_purInfoSeller" title="판매자 정보 보기">
            판매자: {sellerNickName}
          </span>
        </div>
        <div className="yhw_purInfoTxtBottom">
          <div className="yhw_purInfoPrice">
            <span>판매 입찰가</span>
            <b>{bookData.price}원</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurInfoBoxForPur;
