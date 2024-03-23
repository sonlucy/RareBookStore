import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styled/Purchase.css";
<<<<<<< HEAD
// import Header from "./Header";
=======
import Header from "../components/Header";
>>>>>>> 653a7cd12dcc891b2bd7fbca801f3a95682d62ef
import PurInfoBox from "../components/PurInfoBox";
import PurDefDestCheck from "../components/DefDestCheck";
import PurDefDest from "../components/PurDefDest";
import DestForm from "../components/DestForm";
<<<<<<< HEAD
// import Footer from "./Footer";
=======
import Footer from "../components/Footer";
>>>>>>> 653a7cd12dcc891b2bd7fbca801f3a95682d62ef

const Purchase = () => {
  const [isChecked, setIsChecked] = useState(false);
  
  return (
    <>
<<<<<<< HEAD
      {/* <Header /> */}
=======
      <Header />
>>>>>>> 653a7cd12dcc891b2bd7fbca801f3a95682d62ef

      <div className="yhw_container">
        <div className="yhw_purTopBorderBottom">
          <div className="yhw_purTopCont">
            <b>구매하기</b>
            <PurInfoBox />
          </div>
        </div>
        <div className="yhw_purDefDestCont">
          <PurDefDestCheck isChecked={isChecked} setIsChecked={setIsChecked} />
          <PurDefDest />
        </div>
        <div className="yhw_destFormDiv">
          <DestForm isChecked={isChecked} />
        </div>
        <button className="yhw_purBtn">구매하기</button>
      </div>

<<<<<<< HEAD
      {/* <Footer /> */}
=======
      <Footer />
>>>>>>> 653a7cd12dcc891b2bd7fbca801f3a95682d62ef
    </>
  );
}

export default Purchase;