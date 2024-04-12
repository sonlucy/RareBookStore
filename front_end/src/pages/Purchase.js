import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../styled/Purchase.css";
import Header from "../components/Header";
import PurInfoBox from "../components/PurInfoBox";
import PurDefDestCheck from "../components/DefDestCheck";
import PurDefDest from "../components/PurDefDest";
import DestForm from "../components/DestForm";
import Footer from "../components/Footer";
import usePurInfoData from "../hooks/api/usePurInfoData"; // usePurInfoData 훅 임포트
import useUserAddr from "../hooks/api/useUserAddr"; // usePurInfoData 훅 임포트

const Purchase = () => {
  const [isChecked, setIsChecked] = useState(false);

  const { bookData, sellerData } = usePurInfoData();  // usePurInfoData 훅을 호출하여 bookData 상태와 데이터 가져오는 로직 사용
  const { userAddr, setUserAddr, getAddr, setGetAddr, handlePurBtnClick } = useUserAddr();  // useUserAddr 훅 사용

  // const navigate = useNavigate(); // 구매하기 버튼 클릭 시  해당 도서 Purchase 페이지로 이동


  // 자식 컴포넌트로부터 input 값 받아오는 함수
  const handleDestInputChange = (value) => {
    setUserAddr(value);
  };

  return (
    <>
      <div className="height-container">
        <Header />

        <div className="yhw_container">
          <div className="yhw_purTopBorderBottom">
            <div className="yhw_purTopCont">
              <b>구매하기</b>
              <PurInfoBox bookData={bookData} />
            </div>
          </div>
          <div className="yhw_purDefDestCont">
            <div className="yhw_purDefDestBox">
              <PurDefDestCheck
                isChecked={isChecked}
                setIsChecked={setIsChecked}
              />
              <PurDefDest />
            </div>
          </div>
          <div className="yhw_destFormDiv">
            <DestForm isChecked={isChecked} onInputChange={handleDestInputChange}/>
          </div>
          <button className="yhw_purBtn" onClick={handlePurBtnClick}>
            구매하기
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Purchase;
