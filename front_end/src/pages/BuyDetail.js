import React from "react";
import { Link } from "react-router-dom";
import { VscChevronRight } from "react-icons/vsc";
import "../styled/BuyDetail.css";
// import Header from "./Header";
import DetailTop from "../components/DetailTop";
import StateCategory from "../components/StateCategory";
import DropDownSort from "../components/DropDownSort";
import DetailConts from "../components/DetailConts";
// import Footer from "./Footer";

const BuyDetail = () => {
  return (
    <>
      {/* <Header /> */}

      <div className="yhw_container">
        <div className="yhw_detailCont">  {/* Top부분 전체 감싸는 div */}
          <div className="yhw_detailTopNav">  {/* Top부분 - (절판서점>카테고리>책제목) 감싸는 div */}
            <Link to="/"><span>절판서점</span></Link>
            <span><VscChevronRight /></span>
            <Link to="/"><span>{/* 카테고리 받아올 부분 */}카테고리</span></Link>
            <span><VscChevronRight /></span>
            <Link to="/"><span>{/* 책제목 받아올 부분 */}책제목</span></Link>
          </div>
          <DetailTop />
          <br />
          <StateCategory /> {/* 상태 카테고리 ==> 유진님께서 만드셨다고 함 */}
          <DropDownSort />
          <DetailConts />
          <DetailConts />
        </div>  {/* yhw_detailCont 끝 */}
      </div>
      
      {/* <Footer /> */}
    </>
  );
}

export default BuyDetail;