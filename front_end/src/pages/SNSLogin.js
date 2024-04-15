import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
// 커스텀 훅스
// import useLogOut from "../hooks/api/useLogOut";
import useLoginWithGoogle from "../hooks/api/useLoginWithGoogle";
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
`;

const SNSLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* width: 650px; */
  width: 58%;
  height: 100%;
  min-height: 180px;
  /* height: 450px; */
  /* margin-bottom: 200px; */
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
  width: 400px;
  height: 45%;
  min-height: 176px;
  margin: 0;
  @media screen and (max-width: 621px) {
    width: 90%;
    height: 65%;
  }
  @media screen and (max-width: 425px) {
    width: 100%;
    height: 72%;
    padding-top: 2vh;
  }
`;

const LogoImageBox = styled.div`
  width: 400px;
  padding: 50px 0 40px 0;
  margin-bottom: 40px;
  border-bottom: #ebebeb 2px solid;
`;

const LogoImage = styled.div`
  width: 165px;
  height: 42px;
  background-image: url("/Logo.png");
  margin: 0 auto;
`;

const KakaoLogoImage = styled.div`
  width: 21px;
  width: 21px;
  height: 21px;
  background-image: url("/Kakao.png");
  background-size: contain;
  background-repeat: no-repeat;
`;

const GoogleLogoImage = styled.div`
  width: 21px;
  height: 21px;
  background-image: url("/Google.png");
  background-size: contain;
  background-repeat: no-repeat;
`;

const KakaoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 384px; */
  width: 100%;
  height: 52px;
  background-color: #ffde00;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    background-color: #d8c64b;
  }
  @media screen and (max-width: 1440px) {
    &:active {
      background-color: #d8c64b;
    }
  }
  @media screen and (max-width: 621px) {
    flex-direction: column;
    height: 55px;
    justify-content: space-evenly;
  }
`;

const GoogleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  /* width: 384px; */
  width: 100%;
  height: 52px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.16);
  }
  @media screen and (max-width: 1440px) {
    &:active {
      background-color: rgba(0, 0, 0, 0.16);
    }
  }
  @media screen and (max-width: 621px) {
    flex-direction: column;
    height: 55px;
    justify-content: space-evenly;
  }
`;

const IdContainer = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 384px; */
  width: 100%;
  height: 52px;
  background-color: #f2f8ff;
  border-radius: 10px;
  text-decoration: none;
  color: #1273e4;
  font-size: bold;
  &:hover {
    /* text-decoration: underline; */
    background-color: #bcc8d6;
    color: #f2f8ff;
  }
  cursor: pointer;
  @media screen and (max-width: 1440px) {
    &:active {
      background-color: #bcc8d6;
      color: #f2f8ff;
    }
  }
  @media screen and (max-width: 621px) {
    flex-direction: column;
    height: 55px;
    justify-content: space-evenly;
  }
`;

function SNSLogin() {
  const { login } = useLoginWithGoogle();

  return (
    <>
      <div className="height-container">
        <Header />
        <CenteredContainer>
          <SNSLoginContainer>
            <LogoImageBox>
              <LogoImage />
            </LogoImageBox>
            <LoginContainer>
              <KakaoContainer>
                <KakaoLogoImage />
                <span>카카오로 시작하기</span>
              </KakaoContainer>
              <GoogleContainer onClick={login}>
                <GoogleLogoImage />
                <span>구글로 시작하기</span>
              </GoogleContainer>
              <IdContainer to="/IDPWLogin">
                <span>아이디/비밀번호</span>
              </IdContainer>
            </LoginContainer>
          </SNSLoginContainer>
        </CenteredContainer>
      </div>
      <Footer />
    </>
  );
}

export default SNSLogin;
