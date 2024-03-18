import React from "react";
import { Link } from "react-router-dom";
import "../styled/DetailTop.css";

const DetailTop = () => {
  return (
    <div className="w_detailTopProdBox">  {/* 이미지, 도서명, 저자, 판매자, 판매 입찰 버튼 감싸는 div */}
      <div className="w_detailTopProdInfoBox">
        <img src="https://via.placeholder.com/150x200" alt="상품이미지" />
        <div className="w_detailTopProdInfoTxt">
          <b>{/* 도서명 받아올 부분 */}도서명</b>
          <span>{/* 저자 받아올 부분 */}저자</span>
          <span className="w_detailTopSeller">{/* 판매자 받아올 부분 */}판매자</span>
        </div>
      </div>
      <button className="w_detailTopProdBtn">판매 입찰</button>
    </div>
  );
}

export default DetailTop;