import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styled/PurInfoBox.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PurInfoBox = () => {
  const [bookData, setBookData] = useState({
    itemImg: '',
    itemTitle: '',
    author: '',
    publisher: '',
    seller: ''
  });

  useEffect(() => {
    fetchBookData();
  }, []);

  const fetchBookData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/buyerbook');
      const data = response.data[0];
      const sellerNickname = await getSellerNickname(data.custKey);
      setBookData({
        itemImg: data.itemImg,
        itemTitle: data.itemTitle,
        author: data.author,
        publisher: data.publisher,
        seller: sellerNickname,
        sellerKey: data.custKey //판매자의 custKey 추가
      });
    } catch (error) {
      console.error('Error fetching book data:', error);
    }
  };

  const getSellerNickname = async (custKey) => {
    try {
      const response = await axios.get(`http://localhost:3001/customers/${custKey}`);
      return response.data.nickname;
    } catch (error) {
      console.error('Error fetching seller nickname:', error);
      return '';
    }
  };
  const navigate = useNavigate();
  const convey = () => { 
    navigate('/SellerInfoPage', { //판매자 정보 페이지로 이동
      state: {
        custKey: bookData.sellerKey
      }
    });
  };
  console.log(bookData)
  return (
    <div className="yhw_purInfoBox">
      <Link to="/detail">
        <img src={bookData.itemImg} alt="상품이미지" />
      </Link>
      <div className="yhw_purInfoTxt">
        <div className="yhw_purInfoTxtTop">
          <b>{bookData.itemTitle}</b>
          <span className="yhw_purInfoWriterPub">{bookData.author} | {bookData.publisher}</span>
          <span className="yhw_purInfoSeller" onClick={convey}>판매자: {bookData.seller}</span>
        </div>
        <div className="yhw_purInfoTxtBottom">
          <div className="yhw_purInfoStat">
            <span>상태 등급</span><b>최상</b>
          </div>
          <div className="yhw_purInfoPrice">
            <span>판매 입찰가</span><b>12,000원</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurInfoBox;

