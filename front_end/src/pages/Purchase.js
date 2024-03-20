import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styled/Purchase.css";
// import Header from "./Header";
import PurInfoBox from "../components/PurInfoBox";
import PurDefDest from "../components/PurDefDest";
import DestForm from "../components/DestForm";
// import Footer from "./Footer";

const Purchase = () => {
  const [isChecked, setIsChecked] = useState(false);
  
  return (
    <>
      {/* <Header /> */}

      <div className="yhw_container">
        <div className="yhw_purTopBorderBottom">
          <div className="yhw_purTopCont">
            <b>구매하기</b>
            <PurInfoBox />
          </div>
        </div>
        <PurDefDest isChecked={isChecked} setIsChecked={setIsChecked} />
        <div className="yhw_destFormDiv">
          <DestForm isChecked={isChecked} />
        </div>
        <button className="yhw_purBtn">구매하기</button>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default Purchase;