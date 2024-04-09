import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styled/PurchaseReqList.css';
import axios from 'axios';

const formatDate = (dateString) => {
  const dateStringAsStr = dateString.toString(); // int -> string

  const year = dateStringAsStr.slice(0, 4);
  const month = dateStringAsStr.slice(4, 6);
  const day = dateStringAsStr.slice(6, 8);

  return `${year}-${month}-${day}`;
};


const PurchaseReqListOngoing = ({ requests }) => {
  const navigate = useNavigate(); // 현황보기 버튼 클릭 시 BuyDetail 페이지로 이동
  
  const [ongoingRequests, setOngoingRequests] = useState(requests);
  const handleCancel = (itemBuyKey) => {
    axios.delete(`http://localhost:3001/buyerbook/${itemBuyKey}`)
      .then(response => {
        const updatedRequests = ongoingRequests.filter(request => request.itemBuyKey !== itemBuyKey);
        setOngoingRequests(updatedRequests);
        window.location.reload();
      })
      .catch(error => {
        console.error('상품 취소 에러:', error);
      });
  };

  // 현황보기 버튼 클릭 시 해당 도서 BuyDetail로 이동하는 함수
  const handleStatusButtonClick = (itemBuyKey) => {
    navigate(`/BuyDetail/${itemBuyKey}`);
    window.scrollTo(0, 0); // 페이지 이동 후 화면의 상단으로 스크롤 이동
  };

  return (
    <div>
      {requests.map((request, index) => (
        <div className="sbk-purchase-req-card" key={index}>
          <img className="sbk-book-image" src={request.itemImg} alt={request.itemTitle} />
          <div className="sbk-text-container">
            <div className='sbk-main-container'>
              <h2 className="sbk-book-title">{request.itemTitle}</h2>
              <h2 className="sbk-book-info">{`${request.author} | ${request.publisher}`}</h2>

            </div>

            <div className='sbk-book-status'>
              <dl className='sbk-book-status-dl'>
                <dt className='sbk-book-status-dt'>도서상태</dt>
                <dd className='sbk-book-status-dd'>
                  {request.damage == 0 ? '최상'
                  : request.damage == 1 ? '상'
                  : request.damage >= 2 ? '중'
                  : '-'}
                </dd>
              </dl>
              <dl className='sbk-book-status-dl'>
                <dt className='sbk-book-status-dt'>입찰가</dt>
                <dd className='sbk-book-status-dd'>{request.price}원</dd>
              </dl>
              <dl className='sbk-book-status-dl'>
                <dt className='sbk-book-status-dt'>입찰만료기한</dt>
                <dd className='sbk-book-status-dd' style={{ color: '#EB217C' }}>{formatDate(request.expiry)}</dd>
              </dl>
            </div>
          </div>


          <div className="sbk-button-container">
            <button className="sbk-status-button" onClick={() => handleStatusButtonClick(request.itemBuyKey)}>현황 보기</button>
            <button onClick={() => handleCancel(request.itemBuyKey)} className="sbk-cancel-button">상품등록 취소</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchaseReqListOngoing;