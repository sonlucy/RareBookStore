import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SellBookInfo from "../components/SellBookInfo";
import BookSaleBid from "../components/BookSaleBid";

function SellBook(props) {
  const { itemBuyKey } = useParams();
  return (
    <>
      <div className="height-container">
        <Header />
        <div>
          <SellBookInfo itemBuyKey={itemBuyKey}></SellBookInfo>
          <BookSaleBid></BookSaleBid>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SellBook;
