import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styled/SellerInfo.css";
import SellerInfo from "../components/SellerInfo";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// 계산 로직 수정 필요
const calculateGrade = (point) => {
  if (point >= 4) {
    return "1";
  } else if (point >= 3) {
    return "2";
  } else if (point >= 2) {
    return "3";
  } else if (point >= 1) {
    return "4"
  } else {
    return "0"
  }
};

function SellerInfoPage() {
  const [sellerInfo, setSellerInfo] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // useLocation 훅을 통해 전달된 상태 읽어오기
    const custKey = location.state.custKey;
    if (custKey) {
      // custKey가 존재하는 경우에만 데이터를 가져오도록 처리
      axios.get(`http://localhost:3001/customers/${custKey}`)
        .then(response => {
          const customer = response.data;
          console.log(customer)
          const point = customer.point;
          const grade = calculateGrade(point);
          const sellerData = {
            sellerName: customer.nickname,
            grade: grade,
            point: customer.point,

            reviews: [], /* reviews 테이블에서 */
            itemSellKeys: [], /* sellerbook 테이블에서 */
          };
          setSellerInfo([sellerData]);
        })
        .catch(error => {
          console.error('Error fetching seller info:', error);
        });
    }
  }, [location.state.custKey]); // 상태 변경 시 재렌더링
  return (
    <>
      <div className="height-container">
        <Header />
        <SellerInfo sellerInfoList={sellerInfo} />
      </div>
      <Footer />
    </>
  );
}

export default SellerInfoPage;
