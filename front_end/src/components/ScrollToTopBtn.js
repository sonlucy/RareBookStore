import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ScrollToTopButton = styled.button`
  //오른쪽 밑에 고정
  position: fixed; 
  bottom: 30px; right: 30px;

  display: ${({ visible }) => (visible ? "block" : "none")};
  background-color: #ffffff97;
  box-shadow: 2px 2px 10px #181818bc;
  color: #636363;
  border: none;
  border-radius: 10px;
  width: 80px;
  height: 80px;
  font-size: 40px;
  font-weight: 900;
  cursor: pointer;
  z-index: 100; //제일 위로 가게

  @media (max-width: 1440px) {
    bottom: 25px;
    right: 25px;
    width: 70px;
    height: 70px;
    font-size: 30px;
    font-weight: 700;
  }
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    font-size: 20px;
    font-weight: 700;
  }
`;

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 300) {
      setIsVisible(true);
    } else {  // 일정 픽셀 이상 내려갔을 경우에만 버튼 보이도록
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ScrollToTopButton visible={isVisible} onClick={scrollToTop}>
      ↑
    </ScrollToTopButton>
  );
};

export default ScrollToTopBtn;
