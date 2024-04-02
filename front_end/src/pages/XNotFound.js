import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

// 스타일드 컴포넌트 생성
const StyledDiv = styled.div`
  height: 50vh;
  padding-left: 25%;
`;

const XNotFound = () => {

  return (
    <>
      <div className="height-container">
        <Header />

        <StyledDiv className="yhw_container">
          <h1>404 Error</h1>
        </StyledDiv>

        <Footer />
      </div>
    </>
  );
};

export default XNotFound;