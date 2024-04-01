// import { BrowserRouter as Router } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styled/SellerInfo.css";
import SellerInfo from "../components/SellerInfo";

const sellerInfoList = [
  {
    sellerName: "아기돌고래",
    /*     grade: "2", */
    point: 4.2,
    reviews: [
      { buyerName: "아기돌고래", review: "상품 좋았습니다^^" },
      { buyerName: "아기판다", review: "깨끗하고 좋았습니다!" },
    ],
    itemSellKeys: [123, 456, 789, 111, 222, 333, 444, 555, 666, 777, 888, 999],
  },
];

const calculateGrade = (point) => {
  if (point >= 4.5) {
    return "1";
  } else if (point >= 4) {
    return "2";
  } else {
    return "3";
  }
};
const setGradeForSellerInfoList = (sellerInfoList) => {
  /* 등급 붙여주기 */
  return sellerInfoList.map((sellerInfo) => ({
    ...sellerInfo,
    grade: calculateGrade(sellerInfo.point),
  }));
};

const sellerInfoListWithGrade = setGradeForSellerInfoList(sellerInfoList);

function SellerInfoPage() {
  return (
    <>
    <div className="height-container">
      <Header />
      <SellerInfo sellerInfoList={sellerInfoListWithGrade} />
    </div>
      <Footer />
    </>
  );
}

export default SellerInfoPage;
