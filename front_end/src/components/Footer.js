import React from "react";
import "../styled/Footer.css";

const Footer = () => {
  return (
    <footer className="sbk-footer-container">
      <p className="sbk-footer-text">제작자 코코무 | 이총명 전윤하 서현우 손보경 유혜원 차유진</p>
      <p className="sbk-footer-text">주소 | 서울특별시 강남구 언주로 508 14층 (역삼동, 서울상록빌딩)</p>
      <a href="/admin" className="sbk-admin-link">절판서점 관리자 모드로 접속하기</a>
    </footer>
  );
};

export default Footer;
