import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styled/PurchaseHistory.css";
import Header from "../components/Header";
import MyPageSide from "../components/MypageSide";
import DateInquiry from "../components/DateInquiry";
import PurInfoBox from "../components/PurInfoBox";
import Footer from "../components/Footer";
import usePurInfoData from '../hooks/api/usePurInfoData'; // usePurInfoData 훅 임포트

const PurchaseHistory = () => {
  // usePurInfoData 훅을 호출하여 bookData 상태와 데이터 가져오는 로직 사용
  const { bookData, fetchBookData } = usePurInfoData();

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchBookData();
  }, [fetchBookData]);

  const navigate = useNavigate(); // 구매후기작성 버튼 클릭 시 구매후기작성 페이지로 이동

  const handleClick = () => {
    navigate('/Mypage/PurchaseReview');
  };

  return (
    <>
      <div className="height-container">
      <Header />

      <div className="yhw_container">
        <div className="yhw_purHistCont">
          <div className="yhw_MypageSideAdd">
            <MyPageSide />
          </div>
          <div className="yhw_purHistMainCont">
            <div className="yhw_purHistTopCont">
              <b>구매내역</b>
              <DateInquiry /> {/* 날짜 조회 컴포넌트 일단 대충 만들어둠 */}
            </div>
            <div className="yhw_purHistContentsBox">
              <span className="yhw_purHistContentsDate">{/* 해당 날짜 표시 */}2024-03-15</span>
              {/* 구매 정보 표시 */}
              <ul className="yhw_purHistLists">
                <li>
                  {bookData.itemImg && ( // bookData가 설정되었는지를 확인
                    <PurInfoBox bookInfos={bookData} />
                  )}
                  <div className="yhw_purHistBtns">
                    <button onClick={handleClick}>구매 후기 작성</button> {/* 후기 작성 완료 시 버튼 비활성화 기능 추가할 예정 */}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
</div>
      <Footer />
    </>
  );
}

export default PurchaseHistory;