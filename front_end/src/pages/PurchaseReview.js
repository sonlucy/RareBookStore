import React, { useContext, useState, useEffect, useMemo } from "react";
import PurchaseBanner from "../components/PurchaseBanner";
import ReviewCreate from "../components/ReviewCreate";
import Header from "../components/Header";
import MyPageSide from "../components/MypageSide";
import Footer from "../components/Footer";
import { LoginContext } from "../components/LoginContext";
import { useParams } from "react-router-dom";
import axios from "axios";

function PurchaseReview(props) {
  const { loginUser, isLoggedIn } = useContext(LoginContext);
  const [BookOrderData, setBookOrderData] = useState([]);
  const [purLists, setPurLists] = useState([]);
  const { itemKey } = useParams();
  const [filteredSellerData, setFilteredSellerData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/buyerbook/${loginUser}`
        );
        const buyerbooks = response.data;
        const filteredBuyerbooks = buyerbooks.filter(
          (request) =>
            request.aucStatus === 1 && request.itemBuyKey === parseInt(itemKey)
        );
        setPurLists(filteredBuyerbooks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, loginUser]);

  useEffect(() => {
    orderData(); // Call orderData() when component mounts
  }, []);

  useEffect(() => {
    if (BookOrderData.length > 0) {
      sellerData(); // Call sellerData() only when BookOrderData is updated
    }
  }, [BookOrderData]);

  const orderData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/orders/customer/${loginUser}`
      );
      const orderByCustomer = response.data;
      setBookOrderData(orderByCustomer);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sellerData = async () => {
    const itemSellKeys = BookOrderData.map((order) => order.itemSellKey);
    try {
      const filteredDataArray = await Promise.all(
        itemSellKeys.map(async (sellKey) => {
          const response = await axios.get(
            `http://localhost:3001/sellerbook/sellbuy/${sellKey}/${itemKey}`
          );
          return response.data;
        })
      );
      const filteredData = filteredDataArray.filter((data) => data.length > 0);
      console.log("Filtered Data Array:", filteredData);

      setFilteredSellerData(filteredData);

      // 여기서 필요한 처리를 수행합니다.
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="height-container">
        <Header />
        <div className="yhw_container">
          <div className="yhw_purHistCont">
            <div className="yhw_MypageSideAdd">
              <MyPageSide />
            </div>
            <div className="yhw_purHistMainCont">
              <div>
                <PurchaseBanner />
                {purLists && filteredSellerData && (
                  <ReviewCreate
                    purLists={purLists}
                    filteredSellerData={filteredSellerData}
                  />
                )}
                {/* <ReviewCreate
                  purLists={purLists}
                  filteredSellerData={filteredSellerData}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PurchaseReview;

// import React, { useContext, useState, useEffect } from "react";
// import PurchaseBanner from "../components/PurchaseBanner";
// import ReviewCreate from "../components/ReviewCreate";
// import Header from "../components/Header";
// import MyPageSide from "../components/MypageSide";
// import Footer from "../components/Footer";
// import { LoginContext } from "../components/LoginContext";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function PurchaseReview(props) {
//   const { loginUser, isLoggedIn } = useContext(LoginContext);
//   const [BookOrderData, setBookOrderData] = useState([]);
//   const [purLists, setPurLists] = useState([]);
//   const { itemKey } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/buyerbook/${loginUser}`
//         );
//         const buyerbooks = response.data;
//         // console.log("사용자의 데이터", buyerbooks);
//         const filteredBuyerbooks = buyerbooks.filter(
//           (request) =>
//             request.aucStatus === 1 && request.itemBuyKey === parseInt(itemKey)
//         ); // 여기서는 aucStatus가 1인 book 정보를 가져와서 PurInfoBox에 넘겨줌
//         setPurLists(filteredBuyerbooks);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     if (isLoggedIn) {
//       fetchData();
//     }
//   }, [isLoggedIn, loginUser]);
//   useEffect(() => {
//     orderData();
//     filteredData();
//   }, []);

//   const orderData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/orders/customer/${loginUser}`
//       );
//       const orderByCustomer = response.data;
//       console.log(
//         "주문한 사용자 정보: 로그인한 유저가 구매한 모든 내역",
//         orderByCustomer
//       );
//       setBookOrderData(orderByCustomer);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   console.log("purLists 데이터", purLists);
//   const itemSellKeys = BookOrderData.map((order) => order.itemSellKey);
//   console.log(itemSellKeys, "아이템셀키 만 뽑아온값");

//   const filteredData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/sellerbook/sellbuy/${itemSellKeys}/${itemKey}`
//       );
//       const filteredBySellBuy = response.data;
//       console.log("itemSellKey와 itemBuyKey로 필터링한 값.", filteredBySellBuy);
//       //   setBookOrderData(orderByCustomer);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   return (
//     <>
//       <div className="height-container">
//         <Header />
//         <div className="yhw_container">
//           <div className="yhw_purHistCont">
//             <div className="yhw_MypageSideAdd">
//               <MyPageSide />
//             </div>
//             <div className="yhw_purHistMainCont">
//               <div>
//                 <PurchaseBanner />
//                 <ReviewCreate purLists={purLists} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default PurchaseReview;
