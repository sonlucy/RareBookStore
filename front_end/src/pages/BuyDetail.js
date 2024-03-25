import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VscChevronRight } from "react-icons/vsc";
import "../styled/BuyDetail.css";
import Header from "../components/Header";
import DetailTop from "../components/DetailTop";
import StateCategory from "../components/StateCategory";
import DropDownSort from "../components/DropDownSort";
import DetailConts from "../components/DetailConts";
import Footer from "../components/Footer";
import { productInfosData } from "../asset/productInfosData";

const BuyDetail = () => {
  const [selectedState, setSelectedState] = useState('최상'); // 초기 선택된 상태 설정
  const [filteredProducts, setFilteredProducts] = useState([]); // 필터링된 상품 정보 상태 ==> 초깃값으로는 아무것도 없는 빈 배열을 설정

  // 초기 렌더링 시 최상 상태에 해당하는 상품 필터링
  useEffect(() => {
    filterProductsByState('최상');
    console.log(filterProductsByState);
  }, []);

  // StateCategory에서 선택된 상태를 처리하는 함수
  const handleStateChange = (state) => {
    setSelectedState(state); // 선택된 상태 업데이트
    filterProductsByState(state); // 선택된 상태에 따라 상품 필터링
  };
  
  // 선택된 상태에 따라 상품 필터링 함수
  const filterProductsByState = (selectedStt) => {
    let filtered;
    // 선택된 상태에 따라 상품 필터링
    if (selectedStt === '최상') {
      filtered = productInfosData.filter(product => product.condition.length === 0);
    } else if (selectedStt === '상') {
      filtered = productInfosData.filter(product => product.condition.length === 1);
    } else if (selectedStt === '중') {
      filtered = productInfosData.filter(product => product.condition.length >= 2);
    } else {
      console.log('상태 선택 오류');
    }
    setFilteredProducts(filtered); // 필터링된 상품 업데이트
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
            <StateCategory onStateChange={handleStateChange} />
          </div>
          <div className="yhw_detailMainBox">
            <DropDownSort />
            {/* 필터링된 상품 정보를 기반으로 상품 내용을 화면에 표시 */}
            {filteredProducts.map((productInfo, index) => (
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