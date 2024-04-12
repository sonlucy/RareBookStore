import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styled/PurInfoBox.css";
import usePurInfoData from "../hooks/api/usePurInfoData"; // usePurInfoData 훅 임포트

// 구매하기페이지(Purchase)에서 사용됨
const PurInfoBox = ({ bookData }) => {
  // usePurInfoData 훅을 호출하여 sellerData 상태와 데이터 가져오는 로직 사용
  const { sellerData = {} } = usePurInfoData();  // sellerData를 구조분해할 때 기본값을 설정 => sellerData가 비동기적으로 초기화될 때 undefined가 발생할 수 있기 때문

  const navigate = useNavigate();

  const convey = () => {
    navigate("/SellerInfoPage", {
      //판매자 정보 페이지로 이동
      state: {
        custKey: bookData.sellerKey,
      },
    });
  };

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
            판매자: {bookData.seller}
          </span>
        </div>
        <div className="yhw_purInfoTxtBottom">
          <div className="yhw_purInfoStat">
            <span>상태 등급</span>
            <b>
              {sellerData && sellerData.damage === 0 ? '최상'
              : sellerData && sellerData.damage === 1 ? '상'
              : sellerData && sellerData.damage >= 2 ? '중'
              : '-'}
            </b>
          </div>
          <div className="yhw_purInfoPrice">
            <span>판매 입찰가</span>
            <b>{sellerData && sellerData.price}원</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurInfoBox;
