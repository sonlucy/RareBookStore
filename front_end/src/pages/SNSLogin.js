import React from 'react';
import styled from 'styled-components';
import Header from "../components/Header";
import Footer from "../components/Footer";

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SNSLoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 650px;
    height: 450px;
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
    background-image: url('/Logo.png');
    margin: auto;
`;

const KakaoLogoImage = styled.div`
    width: 21px;
    height: 21px;
    background-image: url('/Kakao.png');
    background-size: contain;
    background-repeat: no-repeat;
`;

const GoogleLogoImage = styled.div`
    width: 21px;
    height: 21px;
    background-image: url('/Google.png');
    background-size: contain;
    background-repeat: no-repeat;
`;

const KakaoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 384px;
    height: 52px;
    background-color: #FFDE00;
    border-radius: 10px;
`;

const GoogleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 384px;
    height: 52px;
    background-color: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.16);
    border-radius: 10px;
`;

const IdContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 384px;
    height: 52px;
    background-color: #F2F8FF;
    border-radius: 10px;
`;

function SNSLogin(props) {
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
                        <GoogleContainer>
                            <GoogleLogoImage />
                            <span>구글로 시작하기</span>
                        </GoogleContainer>
                        <IdContainer>
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
