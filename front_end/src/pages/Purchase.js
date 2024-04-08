import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styled/Purchase.css";
import Header from "../components/Header";
import PurInfoBox from "../components/PurInfoBox";
import PurDefDestCheck from "../components/DefDestCheck";
import PurDefDest from "../components/PurDefDest";
import DestForm from "../components/DestForm";
import Footer from "../components/Footer";
import usePurInfoData from '../hooks/api/usePurInfoData'; // usePurInfoData 훅 임포트

const Purchase = () => {
  const [isChecked, setIsChecked] = useState(false);
  
  // usePurInfoData 훅을 호출하여 bookData 상태와 데이터 가져오는 로직 사용
  const { bookData, fetchBookData } = usePurInfoData();
  
  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchBookData();
  }, [fetchBookData]);
  

  /********************** BuyDetail 페이지의 DetailConts가 아직 연결되지 않아서 제대로 동작하지 않음 **********************/
  const navigate = useNavigate(); // 구매하기 버튼 클릭 시  해당 도서 Purchase 페이지로 이동

  // 구매하기 버튼 클릭 시 해당 도서 Purchase 페이지로 이동하는 함수
  const handlePurBtnClick = () => {
    navigate(`/Purchase/${bookData.itemBuyKey}}`);
    window.scrollTo(0, 0); // 페이지 이동 후 화면의 상단으로 스크롤 이동
  };

  return (
    <>
      <div className="height-container">
      <Header />

      <div className="yhw_container">
        <div className="yhw_purTopBorderBottom">
          <div className="yhw_purTopCont">
            <b>구매하기</b>
            <PurInfoBox bookData={bookData}/>
          </div>
        </div>
        <div className="yhw_purDefDestCont">
          <div className="yhw_purDefDestBox">
            <PurDefDestCheck isChecked={isChecked} setIsChecked={setIsChecked} />
            <PurDefDest />
          </div>
        </div>
        <div className="yhw_destFormDiv">
          <DestForm isChecked={isChecked} />
        </div>
        <button className="yhw_purBtn" onClick={handlePurBtnClick}>구매하기</button>
      </div>
</div>
      <Footer />
    </>
  );
}

export default Purchase;