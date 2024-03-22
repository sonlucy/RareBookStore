import React, { useState } from "react";
import { Link } from "react-router-dom";
import { VscChevronRight } from "react-icons/vsc";
import "../styled/BuyDetail.css";
import Header from "../components/Header";
import DetailTop from "../components/DetailTop";
import StateCategory from "../components/StateCategory";
import DropDownSort from "../components/DropDownSort";
import DetailConts from "../components/DetailConts";
import Footer from "../components/Footer";
import { productInfosData } from "../testData/productInfosData";

const BuyDetail = () => {
  // 선택된 상태를 저장하는 state
  const [filteredProductInfos, setFilteredProductInfos] = useState(productInfosData);
  // 2024.03.22 --> 페이지 기본 상태로 "최상"상태가 선택되어 있도록 설정중(미완성)

  const handleStateChange = (selectedStt) => {
    let filteredProducts;
    // 선택된 상태에 따라 상품 필터링
    if (selectedStt === '최상') {
      filteredProducts = productInfosData.filter(product => product.condition.length === 0);
    } else if (selectedStt === '상') {
      filteredProducts = productInfosData.filter(product => product.condition.length === 1);
    } else if (selectedStt === '중') {
      filteredProducts = productInfosData.filter(product => product.condition.length >= 2);
    } else {
      console.log('상태 선택 오류');
    }
    setFilteredProductInfos(filteredProducts);
  };

  return (
    <>
      <Header />

      <div className="yhw_container">
        <div className="yhw_detailCont">  {/* Top부분 전체 감싸는 div */}
          <div className="yhw_detailTopBox">
            <div className="yhw_detailTopNav">  {/* Top부분 - (절판서점>카테고리>책제목) 감싸는 div */}
              <Link to="/"><span>절판서점</span></Link>
              <span><VscChevronRight /></span>
              <Link to="/"><span>{/* 카테고리 받아올 부분 */}카테고리</span></Link>
              <span><VscChevronRight /></span>
              <Link to="/"><span>{/* 책제목 받아올 부분 */}책제목</span></Link>
            </div>
            <DetailTop />
          </div>
          <br />
          <div className="yhw_deailStatCatBox">
            <StateCategory onStateChange={handleStateChange} /> {/* 상태 카테고리 ==> 유진님께서 만드셨다고 함 */}
          </div>
          <div className="yhw_detailMainBox">
            <DropDownSort />
            {/* 필터링된 상품 정보를 기반으로 상품 내용을 화면에 표시 */}
            {filteredProductInfos.map((productInfo, index) => (
              <DetailConts key={index} productInfo={productInfo} />
            ))}
          </div>
        </div>  {/* yhw_detailCont 끝 */}
      </div>
      
      <Footer />
    </>
  );
}

export default BuyDetail;