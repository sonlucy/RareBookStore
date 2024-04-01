import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styled/Profile.css";
import "../styled/PurchaseHistory.css";
import Header from "../components/Header";
import MyPageSide from "../components/MypageSide";
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
            <div className="yhw_purHistTopCont">
              <b>로그인 정보</b>
            </div>
            <div className="yhw_purHistMainCont">
              <div className="yhw_purHistContentsBox">
                
                  <ul className="lcm_purHistLists">

                    <li>
                      <div>아이디</div>
                      <div className="lcm_purHistBtns">
                        <button>변경</button>

                      </div>
                    </li>
                  
                    <li>
                      <div>비밀번호</div>
                      <div className="lcm_purHistBtns">
                        <button>변경</button>

                      </div>
                    </li>
                  </ul>
  
              </div>
            </div>

            <div className="lcm_purHistContentsBox">
                    <div className="yhw_purHistTopCont">
                      <b>배송지 정보</b>
                    </div>

                    <ul className="lcm_purHistLists">
                      <li>
                        <div>휴대폰 번호</div>
                        <div className="lcm_purHistBtns">
                          <button>변경</button>

                        </div>
                      </li>
                      <li>
                        <div>배송지</div>
                        <div className="lcm_purHistBtns">
                          <button>+ 새 배송지 추가</button>
                          <span>
                            <button>수정</button>
                            <button>삭제</button>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
          </div>
        </div>
      </div>
      <Footer />

    </>
  );
};

export default PurchaseHistory;
