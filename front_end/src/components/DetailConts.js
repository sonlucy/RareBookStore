import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styled/DetailConts.css";
import SellerRanking from "../components/SellerRanking";

const DetailConts = ({ productInfo }) => {
  const { price, seller, grade, condition } = productInfo;
  const [showModal, setShowModal] = useState(false);  // 판매자 정보 보기 modal - useState

  const toggleModal = () => { // 판매자 정보 보기 버튼 클릭 시 모달창 띄우기
    setShowModal(!showModal);
  };

  const navigate = useNavigate(); // 구매후기작성 버튼 클릭 시 구매후기작성 페이지로 이동

  const handlePurBtnClick = () => {
    navigate('/Purchase');
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
            {/* 체크한 상태값 가져와서 화면에 출력 */}
            {/* {condition.map((state, index) => (
              <span key={index} className="yhw_detailContsState">{state}</span>
            ))} */}
            {/* ==> 위에 거 대신 damage 개수(0:최상, 1:상, 2이상:중)에 따른 상태등급을 화면에 출력 */}
            <span>상태 등급</span>
            <b>
              {condition.length === 0 && "최상"}
              {condition.length === 1 && "상"}
              {condition.length >= 2 && "중"}
            </b>
          </div>
        </div>
      </div>
      <div className="yhw_detailContsRBtns">
        <button onClick={handlePurBtnClick}>구매하기</button>
        <button onClick={toggleModal}>판매자 정보 보기</button>
        {/* 판매자 정보 보기 클릭 시 판매자 점수 정보 화면에 출력 ==> 구현중
        {showModal && (
          <div className="modal-content" style={{backgroundColor:"rgba(0, 0, 0, 0.3);"}}>
            <span className="close" onClick={toggleModal} style={{color:"white"}}>&times;</span>
            <SellerRanking style={{width:"40%"}} />
          </div>
        )} */}
      </div>
    </div>
  );
}

export default DetailConts;