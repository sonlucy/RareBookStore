import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SellBookInfo from "../components/SellBookInfo";
import BookSaleBid from "../components/BookSaleBid";
import { LoginContext } from "../components/LoginContext";

function SellBook() {
  const { itemBuyKey } = useParams();
  const { isLoggedIn, loginUser } = useContext(LoginContext);
  return (
    <>
      <div className="height-container">
        <Header />
        <div>
          <SellBookInfo itemBuyKey={itemBuyKey}></SellBookInfo>
          <BookSaleBid
            itemBuyKey={itemBuyKey}
            isLoggedIn={isLoggedIn}
            loginUser={loginUser}
          ></BookSaleBid>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SellBook;
