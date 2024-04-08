import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Title from "../components/Title";
import PurchaseRequest from "../components/PurchaseRequest";
import RecentBooks from "../components/RecentBooks";
import axios from "axios";


function Main() {
  const [recentBuyerBooks, setRecentBuyerBooks] = useState([]);
  const [recentSellerBooks, setRecentSellerBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseBuyerbooks = await axios.get(`http://localhost:3001/buyerbook`);
        const allBuyerbooks = responseBuyerbooks.data; // 모든 구매 희망 도서

        const buyerBooks = allBuyerbooks.map(item => ({
          title: item.itemTitle,
          image: item.itemImg
        }));
        const recentBuyerBooks = buyerBooks.reverse();
        setRecentBuyerBooks(recentBuyerBooks);

        // http://localhost:3001/orders에서 모든 책 조회할 수 있고,, 여기서 status가 2인 것의 itemSellKey를 가져와야함
        const responseOrders = await axios.get(`http://localhost:3001/orders`);
        const orders = responseOrders.data;
        const itemSellKeys = orders.filter(order => order.status === 2).map(order => order.itemSellKey); // "낙찰"인 도서 찾기

        const responseSellerbooks = await Promise.all(itemSellKeys.map(async itemSellKey => {
          try {  // itemSellKeys로 sellerbook의 itemSellKey 가져와서, 해당하는 ietmBuyKey 가져오기
            const responseSellerbook = await axios.get(`http://localhost:3001/sellerbook/orders/${itemSellKey}`); 
            const itemBuyKeys = responseSellerbook.data.map(item => item.itemBuyKey); // 낙찰된 도서(=판매된 도서)의 itemBuyKey 가져오기
            return itemBuyKeys;
          } catch (error) {
            console.error('Error fetching seller book:', error);
            return null; // 오류가 발생하면 null 반환
          }
        }));

        const filteredItemBuyKeys = responseSellerbooks.filter(key => key !== null);
        await fetchRecentSellerBooks(filteredItemBuyKeys);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchRecentSellerBooks = async (itemBuyKeys) => {
    const recentSellerBooks = [];
    try {
      for (const itemBuyKeyArray of itemBuyKeys) {
        const itemInfoArray = await Promise.all(itemBuyKeyArray.map(async itemBuyKey => { 
          try {
            const responseBuyerbook = await axios.get(`http://localhost:3001/buyerbook/item/${itemBuyKey}`); // 해당 itemBuyKey를 가지는 도서정보를 buyerbook에서 조회해 가져오기
            const firstItem = responseBuyerbook.data[0];
            return {  //도서 정보 넣어서 반환
              title: firstItem.itemTitle,
              image: firstItem.itemImg
            };
          } catch (error) {
            console.error(error);
            return null; // 오류가 발생하면 null 반환
          }
        }));

        const filteredItemInfoArray = itemInfoArray.filter(item => item !== null);
        recentSellerBooks.push(...filteredItemInfoArray);
      }
      setRecentSellerBooks(recentSellerBooks.reverse()); //최근 판매된 도서순으로 보이기위해 역순으로 바꿔주기
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="height-container">
        <Header />
        <Title />
        <RecentBooks books={recentBuyerBooks} titleText="최근 구매 희망 도서" />
        <RecentBooks books={recentSellerBooks} titleText="최근 판매 도서" />
        <PurchaseRequest />
      </div>
      <Footer />
    </>
  );
}

export default Main;
