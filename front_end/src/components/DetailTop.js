import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styled/DetailTop.css";
import axios from "axios";

const DetailTop = ({ bookInfo, buyerNickname }) => {
  return (
    <div className="yhw_detailTopProdBox">
      {" "}
      {/* 이미지, 도서명, 저자, 판매자, 판매 입찰 버튼 감싸는 div */}
      <div className="yhw_detailTopProdInfoBox">
        <img src={bookInfo.itemImg} alt="상품이미지" />
        <div className="yhw_detailTopProdInfoTxt">
          <div className="yhw_detailTopProdInfoTop">
            <b>{bookInfo.itemTitle}</b>
            <span>
              {bookInfo.author} | {bookInfo.publisher}
            </span>
            <span className="yhw_detailTopBuyer">구매자 {buyerNickname}</span>
            {/* <span className="yhw_detailTopBuyer">구매자 {loginUser}</span> */}
          </div>
          <div className="yhw_detailTopProdInfoBottom">
            <span className="yhw_detailTopDeadline">입찰 마감 기한</span>
            <span className="yhw_detailTopDate">{bookInfo.expiry}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTop;
