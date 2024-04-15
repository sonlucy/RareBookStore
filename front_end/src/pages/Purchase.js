import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styled/Purchase.css";
import Header from "../components/Header";
import PurInfoBoxForPur from "../components/PurInfoBoxForPur";
// import PurDefDestCheck from "../components/DefDestCheck";
import PurDefDest from "../components/PurDefDest";
import DestForm from "../components/DestForm";
import Footer from "../components/Footer";

import useBookDataByItemSellKey from "../hooks/api/useBookDataByItemSellKey";
import useBuyerInformation from "../hooks/api/useBuyerInformation";

const Purchase = () => {
  const params = useParams();
  const itemSellKey = params.itemSellKey;
  // console.log(itemSellyKey, "itemSellyKey");
  const bookData = useBookDataByItemSellKey(itemSellKey);
  // console.log(bookData, "bookData 데이터");
  const userInfo = useBuyerInformation(bookData.itemBuyKey);

  const [addInfo, setAddinfo] = useState({
    sellerKey: "",
    price: "",
    status: "",
    itemSellKey: "",
  });

  useEffect(() => {
    setAddinfo({
      sellerKey: bookData.sellerKey,
      price: bookData.price,
      status: 2,
      itemSellKey: parseInt(itemSellKey),
    });
  }, [bookData, itemSellKey]);

  const [userAddr, setUserAddr] = useState({
    custKey: bookData.custKey,
    name: "",
    tel: "",
    postcode: "",
    addr: "",
    addrDetail: "",
  });

  const updatedAddr = { ...userAddr, ...addInfo };

  /********************** BuyDetail 페이지의 DetailConts가 아직 연결되지 않아서 제대로 동작하지 않음 **********************/
  const navigate = useNavigate(); // 구매하기 버튼 클릭 시  해당 도서 Purchase 페이지로 이동

  // 구매하기 버튼 클릭 시 해당 도서 Purchase 페이지로 이동하는 함수
  const handlePurBtnClick = async (e) => {
    e.preventDefault();

    console.log(updatedAddr, "업데이트된 주소값");
    if (updatedAddr.addr === "") {
      alert(
        "요청을 처리하는 중에 문제가 발생했습니다. 나중에 다시 시도하거나 지원팀에 문의하여 주십시오."
      );
      navigate("/Mypage/RegRequest");
    }
    try {
      // Make a POST request using Axios
      const response = await axios.post(
        "http://localhost:3001/orders",
        updatedAddr
      );
      const modifyAucStatus = await axios.put(
        `http://localhost:3001/buyerbook/aucStatus/${bookData.itemBuyKey}`,
        { aucStatus: 1 }
      );

      // Handle the response if needed
      console.log("Response:", response.data);
      console.log("aucStatus 변경 완료", modifyAucStatus.data);
      alert("구매가 완료되었습니다.");
      navigate("/Mypage/PurchaseHistory");
    } catch (error) {
      // Handle errors if the request fails
      console.error("Error:", error);
    }

    window.scrollTo(0, 0); // 페이지 이동 후 화면의 상단으로 스크롤 이동
  };

  const handleUserAddrChange = (newAddress) => {
    // 1. 매개변수로 전달된 새로운 주소 정보를 출력하여 확인
    console.log("New Address:", newAddress);
    setUserAddr(newAddress); // Update userAddr state with new address data from DestForm
  };
  return (
    <>
      <div className="height-container">
        <Header />

        <div className="yhw_container">
          <div className="yhw_purTopBorderBottom">
            <div className="yhw_purTopCont">
              <b>구매하기</b>
              {/* <PurInfoBox /> */}
              <PurInfoBoxForPur bookData={bookData} userInfo={userInfo} />
            </div>
          </div>
          <div className="yhw_purDefDestCont">
            <div className="yhw_purDefDestBox">
              <PurDefDest />
            </div>
          </div>
          <div className="yhw_destFormDiv">
            <DestForm handleUserAddrChange={handleUserAddrChange} />
          </div>
          <button className="yhw_purBtn" onClick={handlePurBtnClick}>
            구매하기
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Purchase;
