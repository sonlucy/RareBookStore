import React from "react";
import { useNavigate } from "react-router-dom";
import "../styled/DetailConts.css";

const DetailConts = ({ productInfo }) => {
  const { price, seller, grade, condition } = productInfo;
  const navigate = useNavigate(); // 구매후기작성 버튼 클릭 시 구매후기작성 페이지로 이동

  const handlePurBtnClick = () => {
    navigate('/Purchase');
    window.scrollTo(0, 0); // 페이지 이동 후 화면의 상단으로 스크롤 이동
  };
  const handleSellerInfoBtnClick = () => {
    navigate('/SellerInfoPage');
    window.scrollTo(0, 0); // 페이지 이동 후 화면의 상단으로 스크롤 이동
  };

  return (
    <div className="yhw_detailContsBox">
      <div className="yhw_detailContsLElts">
        <img src="https://via.placeholder.com/120x160" alt="상품이미지" />
        <div className="yhw_detailContsLTxt">
          <div className="yhw_detailContsLTop">
            <b>{price}</b>
            <span className="yhw_detailContsSeller">판매자 {seller} &#40;등급 {grade}&#41;</span>
          </div>
          <div className="yhw_detailContsLBottom">
            {condition.map((state, index) => (
              <span key={index} className="yhw_detailContsState">{state}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="yhw_detailContsRBtns">
        <button onClick={handlePurBtnClick}>구매하기</button>
        <button onClick={handleSellerInfoBtnClick}>판매자 정보 보기</button>
      </div>
    </div>
  );
}

export default DetailConts;