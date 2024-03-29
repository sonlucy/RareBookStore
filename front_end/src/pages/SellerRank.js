// import { BrowserRouter as Router } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styled/PurchaseHistory.css";
import "../styled/SellerRanking.css"
import SellerRanking from "../components/SellerRanking";
import MyPageSide from "../components/MypageSide";

const sellerInfoList = [
  {
    sellerName: "아기돌고래",
    /*     grade: "2", */
    point: 3.7,
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
const setGradeForSellerInfoList = (sellerInfoList) => {
  /* 등급 붙여주기 */
  return sellerInfoList.map((sellerInfo) => ({
    ...sellerInfo,
    grade: calculateGrade(sellerInfo.point),
  }));
};

const sellerInfoListWithGrade = setGradeForSellerInfoList(sellerInfoList);

function SellerRank() {
  return (
    <div className="App">
      <Header />
      <div className="yhw_container">
        <div className="yhw_purHistCont">
          <div className="yhw_MypageSideAdd">
            <MyPageSide />
          </div>
          <div className="jyh-sellerRank-Container">
          {/* <div className="yhw_purHistMainCont"> */}
            <SellerRanking sellerInfoList={sellerInfoListWithGrade} />
          {/* </div> */}</div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SellerRank;
