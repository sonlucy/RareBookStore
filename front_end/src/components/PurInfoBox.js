import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styled/PurInfoBox.css";
import useSellerNickname from "../hooks/api/useSellerNickname";
import useGetReviews from "../hooks/api/useGetReviews";

const PurInfoBox = ({ bookData, orderBookData }) => {
  // orderBookData가 존재하고 유효한 경우에만 판매자 닉네임을 가져오도록 설정
  const sellerKey = orderBookData ? orderBookData.sellerKey : null;
  const sellerNickName = useSellerNickname(sellerKey);
  const itemKey = orderBookData ? orderBookData.itemKey : null;

  //========== 리뷰값 가져오기 =========//
  const Reviews = useGetReviews(itemKey); //리뷰값 가져오기
  // console.log(Reviews);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // orderBookData가 비어 있지 않으면 로딩 상태를 false로 변경
    if (orderBookData) {
      setLoading(false);
    }
  }, [orderBookData]);

  const navigate = useNavigate();

  const convey = () => {
    navigate("/SellerInfoPage", {
      //판매자 정보 페이지로 이동
      state: {
        custKey: orderBookData.sellerKey,
      },
    });
  };
  // console.log(orderBookData, "전달받은 orderBookData");

  if (loading) {
    return null; // 로딩 중에는 아무것도 렌더링하지 않음
  }
  return (
    <div className="yhw_purInfoBox">
      <Link to="/detail">
        <img src={bookData.itemImg} alt="상품이미지" />
      </Link>
      <div className="yhw_purInfoTxt">
        <div className="yhw_purInfoTxtTop">
          <b>{bookData.itemTitle}</b>
          <span className="yhw_purInfoWriterPub">
            {bookData.author} | {bookData.publisher}
          </span>
          <span
            className="yhw_purInfoSeller"
            title="판매자 정보 보기"
            onClick={convey}
          >
            판매자: {sellerNickName}
          </span>
        </div>
        <div className="yhw_purInfoTxtBottom">
          <div className="yhw_purInfoStat">
            <span>구매 날짜</span>
            <b>{orderBookData.dateBuy.substring(0, 10)}</b>
          </div>
          <div className="yhw_purInfoPrice">
            <span>판매 입찰가</span>
            <b>{orderBookData.price}원</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurInfoBox;
