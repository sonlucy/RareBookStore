import React from "react";
import { Link } from "react-router-dom";
import "../styled/DetailTop.css";

const DetailTop = () => {
  return (
    <div className="yhw_detailTopProdBox">  {/* 이미지, 도서명, 저자, 판매자, 판매 입찰 버튼 감싸는 div */}
      <div className="yhw_detailTopProdInfoBox">
        <img src="https://via.placeholder.com/180x240" alt="상품이미지" />
        <div className="yhw_detailTopProdInfoTxt">
          <div className="yhw_detailTopProdInfoTop">
            <b>{/* 도서명 받아올 부분 */}도서명</b>
            <span>{/* 저자 받아올 부분 */}저자</span>
<<<<<<< HEAD
            <span className="yhw_detailTopBuyer">구매자: {/* 구매자 받아올 부분 */}아기돌고래</span>
=======
            <span className="yhw_detailTopBuyer">구매자 {/* 구매자 받아올 부분 */}아기돌고래</span>
>>>>>>> 653a7cd12dcc891b2bd7fbca801f3a95682d62ef
          </div>
          <div className="yhw_detailTopProdInfoBottom">
            <span className="yhw_detailTopDeadline">입찰 마감 기한</span>
            <span className="yhw_detailTopDate">{/* 마감 날짜 받아올 부분 */}2024-03-19</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailTop;