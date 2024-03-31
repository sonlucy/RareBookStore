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
  height: 800px;
`;

const SNSLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 650px;
  height: 450px;
  margin-bottom: 200px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 385px;
  height: 176px;
  margin: 0;
`;

const LogoImage = styled.div`
  width: 165px;
  height: 42px;
  background-image: url("/Logo.png");
  margin: 50px;
`;

const KakaoLogoImage = styled.div`
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
  width: 384px;
  height: 52px;
  background-color: #ffde00;
  border-radius: 10px;
`;

const GoogleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 384px;
  height: 52px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 10px;
`;

const IdContainer = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 384px;
  height: 52px;
  background-color: #f2f8ff;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
`;

function SNSLogin(props) {
  const { login } = useLoginWithGoogle();

  return (
    <div>
      <Header />
      <CenteredContainer>
        <SNSLoginContainer>
          <LogoImage></LogoImage>
          <LoginContainer>
            <KakaoContainer>
              <KakaoLogoImage />
              <span>카카오로 시작하기</span>
            </KakaoContainer>
            <GoogleContainer onClick={login}>
              <GoogleLogoImage />
              <span>구글로 시작하기</span>
            </GoogleContainer>
            {/* <GoogleContainer onClick={logout}>
              <GoogleLogoImage />
              <span>로그아웃</span>
            </GoogleContainer> */}
            <IdContainer to="/IDPWLogin">
              <span>아이디/비밀번호</span>
            </IdContainer>
          </LoginContainer>
        </SNSLoginContainer>
      </CenteredContainer>
      <Footer />
    </div>
  );
}

export default SNSLogin;
