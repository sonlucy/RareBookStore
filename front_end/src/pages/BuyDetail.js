import React from "react";
import { Link } from "react-router-dom";
import { VscChevronRight } from "react-icons/vsc";
import "../styled/BuyDetail.css";
// import NavBar from "./NavBar";
import DetailTop from "../components/DetailTop";
import StateCategory from "../components/StateCategory";
import DropDownSort from "../components/DropDownSort";
// import Footer from "./Footer";

const BuyDetail = () => {
  return (
    <>
      {/* <NavBar /> */}

      <div className="w_container">
        <div className="w_detailCont">  {/* Top부분 전체 감싸는 div */}
          <div className="w_detailTopNav">  {/* Top부분 - (절판서점>카테고리>책제목) 감싸는 div */}
            <Link to="/"><span>절판서점</span></Link>
            <span><VscChevronRight /></span>
            <Link to="/"><span>{/* 카테고리 받아올 부분 */}카테고리</span></Link>
            <span><VscChevronRight /></span>
            <Link to="/"><span>{/* 책제목 받아올 부분 */}책제목</span></Link>
          </div>
          <DetailTop />
          <br />
          <StateCategory />
          <DropDownSort />
          {/* <Contents /> */}
        </div>  {/* w_detailCont 끝 */}
      </div>
      
      {/* <Footer /> */}
    </>
  );
}

export default BuyDetail;