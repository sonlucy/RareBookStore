import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styled/PurchaseHistory.css";
import Header from "../components/Header";
import MyPageSide from "../components/MypageSide";
import DateInquiry from "../components/DateInquiry";
import PurInfoBox from "../components/PurInfoBox";
import Footer from "../components/Footer";

const PurchaseHistory = () => {
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
                  <PurInfoBox />
                  <div className="yhw_purHistBtns">
                    <button>구매 후기 작성</button> {/* 후기 작성 완료 시 버튼 비활성화 기능 추가할 예정 */}
                  </div>
                </li>
                <li>
                  <PurInfoBox />
                  <div className="yhw_purHistBtns">
                    <button>구매 후기 작성</button> {/* 후기 작성 완료 시 버튼 비활성화 기능 추가할 예정 */}
                  </div>
                </li>
              </ul>
              {/* <ul>
                {purchaseData.map((purchase) => (
                  <li key={purchase.id}>
                    {purchase.productName} - {purchase.price}
                  </li>
                ))}
              </ul> */}
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