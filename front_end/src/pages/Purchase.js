import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styled/Purchase.css";
import Header from "../components/Header";
import PurInfoBox from "../components/PurInfoBox";
import PurDefDestCheck from "../components/DefDestCheck";
import PurDefDest from "../components/PurDefDest";
import DestForm from "../components/DestForm";
import Footer from "../components/Footer";

const Purchase = () => {
  const [isChecked, setIsChecked] = useState(false);
  
  return (
    <>
      <Header />

      <div className="yhw_container">
        <div className="yhw_purTopBorderBottom">
          <div className="yhw_purTopCont">
            <b>구매하기</b>
            <PurInfoBox />
          </div>
        </div>
        <div className="yhw_purDefDestCont">
          <div className="yhw_purDefDestBox">
            <PurDefDestCheck isChecked={isChecked} setIsChecked={setIsChecked} />
            <PurDefDest />
          </div>
        </div>
        <div className="yhw_destFormDiv">
          <DestForm isChecked={isChecked} />
        </div>
        <button className="yhw_purBtn">구매하기</button>
      </div>

      <Footer />
    </>
  );
}

export default Purchase;