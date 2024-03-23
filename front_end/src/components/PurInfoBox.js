import React from "react";
import { Link } from "react-router-dom";
import "../styled/PurInfoBox.css";

const PurInfoBox = () => {
  return (
      <div className="yhw_purInfoBox">
        <Link to="/detail">
          <img  src="https://via.placeholder.com/150x200" alt="상품이미지" />
        </Link>
        <div className="yhw_purInfoTxt">
          <div className="yhw_purInfoTxtTop">
            <b>도서명</b>
            <span className="yhw_purInfoWriterPub">{/* 저자 들어갈 부분 */}저자 | {/* 출판사 들어갈 부분 */}출판사</span>
            <span className="yhw_purInfoSeller">판매자 {/* 판매자 들어갈 부분 */}아기사자</span>
          </div>
          <div className="yhw_purInfoTxtBottom">
            <div className="yhw_purInfoStat">
              <span>상태 등급</span><b>{/* 상태 들어갈 부분 */}최상</b>
            </div>
            <div className="yhw_purInfoPrice">
              <span>판매 입찰가</span><b>{/* 가격 들어갈 부분 */}12,000원</b>
            </div>
          </div>
        </div>
      </div>
  );
}

export default PurInfoBox;