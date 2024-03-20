import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styled/SignUp.css";
// import Header from "./Header";
// import Footer from "./Footer";

const SignUpEasy = () => {

  return (
    <>
      {/* <Header /> */}
      <div className="yhw_container">
        <form className="yhw_signForm">
          <h4>환영합니다! 정보를 입력해주세요.</h4>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">닉네임</span>
            <input
              // value={userNumber}
              // onChange={(e) => setUserNumber(e.target.value)}
              type="text"
              placeholder="전화번호"
              required
              />
              <button className="yhw_dupCheckBtn">중복확인</button>
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">나이</span>
            <input
              className="yhw_lastSignInput"
              // value={userAddress}
              // onChange={(e) => setUserAddress(e.target.value)}
              type="number"
              placeholder="나이"
              required
              />
            <span>세</span>
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">성별</span>
              <div className="yhw_signGenderBtns">
                <button>남자</button>
                <button>여자</button>
              </div>
          </div>
          <div className="yhw_signUpBtnBox">
            <button type="submit">회원가입</button>
          </div>
        </form>
      </div>  {/* yhw_container 끝 */}
      
      {/* <Footer /> */}
    </>
  );
};

export default SignUpEasy;
