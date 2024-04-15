import React, { useContext, useState, useEffect, useMemo } from "react";
import { serverURL } from "../config";
import PurchaseBanner from "../components/PurchaseBanner";
import ReviewCreate from "../components/ReviewCreate";
import Header from "../components/Header";
import MyPageSide from "../components/MypageSide";
import Footer from "../components/Footer";
import { LoginContext } from "../components/LoginContext";
import { useParams } from "react-router-dom";
import axios from "axios";

function PurchaseReview() {
  const { loginUser, isLoggedIn } = useContext(LoginContext);
  const [BookOrderData, setBookOrderData] = useState([]);
  const [purLists, setPurLists] = useState([]);
  const { itemKey } = useParams();
  const [filteredSellerData, setFilteredSellerData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${serverURL}/buyerbook/${loginUser}`
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
        `${serverURL}/orders/customer/${loginUser}`
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
            `${serverURL}/sellerbook/sellbuy/${sellKey}/${itemKey}`
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
