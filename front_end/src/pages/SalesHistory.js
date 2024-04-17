import React, { useState, useEffect, useContext } from "react";
import { serverURL } from "../config";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PurchaseReqForm from "../components/PurchaseReqForm";
import SalesHistoryList from "../components/SalesHistoryList";
import MyPageSide from "../components/MypageSide";
import DateInquiry from "../components/DateInquiry";
import "../styled/PurchaseHistory.css";
import { LoginContext } from "../components/LoginContext";
import axios from "axios";

function SalesHistory() {
  const { isLoggedIn, loginUser } = useContext(LoginContext);
  const [salesHistory, setSalesHistory] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsebuyerbooks = await axios.get(
          `${serverURL}/buyerbook`
        );
        const allbuyerbooks = responsebuyerbooks.data; // 모든 구매 희망 도서

        const responseSeller = await axios.get(
          `${serverURL}/sellerbook/seller/${loginUser}`
        ); //특정 판매자의 판매 희망 책 조회
        const sellerBooks = responseSeller.data;

        const responseOrders = await axios.get(
          `${serverURL}/orders/seller/${loginUser}`
        ); // 판매자의 key
        const orders = responseOrders.data;

        const salesHistoryData = sellerBooks.map((sellerBook) => {
          const order = orders.find(
            (order) => order.itemSellKey === sellerBook.itemSellKey
          );

          // 모든 구매 희망 도서에서, itemBuyKey 같은 것만 출력
          const matchingBuyerBook = allbuyerbooks.find(
            (buyerBook) => buyerBook.itemBuyKey === sellerBook.itemBuyKey
          );
          // 판매 기록의 각 항목 구성
          return {
            // itemImg, itemTitle, author, publisher, expiry는 buyerbook 테이블에서(itemBuyKey로)
            itemImg: matchingBuyerBook.itemImg,
            itemTitle: matchingBuyerBook.itemTitle,
            author: matchingBuyerBook.author,
            publisher: matchingBuyerBook.publisher,
            expiry: matchingBuyerBook.expiry,

            // damage, price는 sellerbook테이블에서 (custKey로)
            damage: sellerBook.damage,
            price: sellerBook.price,

            // status는 orders테이블에서
            status: order
              ? order.status
              : 1 /* orders 테이블에 없으면 1을 디폴트값으로 */,

            itemId: sellerBook.itemSellKey,
            dateEnroll: sellerBook.dateEnroll,
            itemBuyKey: sellerBook.itemBuyKey,
          };
        });

        setSalesHistory(salesHistoryData);
        console.log("최종전달배열", salesHistoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, loginUser]);

  const handleSearch = async (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
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
              <div className="yhw_purHistTopCont">
                <b>판매내역</b>
                <DateInquiry onSearch={handleSearch}/> {/* 날짜 조회 컴포넌트 일단 대충 만들어둠 */}
              </div>
              

              <SalesHistoryList requests={salesHistory} startDate={startDate} endDate={endDate} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SalesHistory;
