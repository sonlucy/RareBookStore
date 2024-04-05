import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from "../components/LoginContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SellerRanking from "../components/SellerRanking";
import MyPageSide from "../components/MypageSide";
import "../styled/PurchaseHistory.css";
import "../styled/SellerRanking.css";

const calculateGrade = (point) => {
  if (point >= 4.5) {
    return "1";
  } else if (point >= 3.5) {
    return "2";
  } else if (point >= 2.5) {
    return "3";
  } else if (point >= 1.5) {
    return "4";
  } else {
    return "5";
  }
};

function Rank() {
  const { isLoggedIn, loginUser } = useContext(LoginContext);
  const [sellerInfoPointGrade, setSellerInfoPointGrade] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 판매자 정보 업데이트
        await updateSellerInfo();

        // 사용자 정보 가져오기
        const response = await axios.get(`http://localhost:3001/customers/${loginUser}`);
        const customerData = response.data;
        const point = customerData.point;
        const grade = calculateGrade(point);

        // 판매자 정보 설정
        const sellerInfo = [{ point, grade }];
        setSellerInfoPointGrade(sellerInfo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const updateSellerInfo = async () => {
      try {
        // 리뷰 정보 가져오기
        const reviewsResponse = await axios.get(`http://localhost:3001/reviews/seller/${loginUser}`);
        const reviews = reviewsResponse.data;
        let point = 0;
        if (reviews.length>0) {
          const totalSatisfaction = reviews.reduce((sum, review) => sum + review.satisfaction, 0);
          const totalRepurchase = reviews.reduce((sum, review) => sum + review.repurchase, 0);
          const avgSatisfaction = totalSatisfaction / reviews.length;
          const avgRepurchase = totalRepurchase / reviews.length;
          point = ((avgSatisfaction + avgRepurchase) / 2).toFixed(1);
        }
        const grade = calculateGrade(point);

        // DB 업데이트
        await axios.put(`http://localhost:3001/updateCustomerPoint/${loginUser}`, { grade, point });
        console.log('업데이트 성공');
      } catch (error) {
        console.error('업데이트 실패:', error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, loginUser]);

  return (
    <>
      <div className="height-container">
        <Header />
        <div className="yhw_container">
          <div className="yhw_purHistCont">
            <div className="yhw_MypageSideAdd">
              <MyPageSide />
            </div>
            <div className="jyh-sellerRank-Container">
              <SellerRanking sellerInfoList={sellerInfoPointGrade} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Rank;
