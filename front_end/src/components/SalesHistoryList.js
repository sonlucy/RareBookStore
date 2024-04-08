
import React from 'react';
import { useNavigate } from "react-router-dom";
import '../styled/PurchaseReqList.css';
import axios from 'axios';

const SalesHistoryList = ({ requests }) => {

  const navigate = useNavigate(); // 현황보기 버튼 클릭 시 BuyDetail 페이지로 이동

  // 현황보기 버튼 클릭 시 해당 도서 BuyDetail로 이동하는 함수
  const handleStatusButtonClick = (itemBuyKey) => {
    navigate(`/BuyDetail/${itemBuyKey}`);
    window.scrollTo(0, 0); // 페이지 이동 후 화면의 상단으로 스크롤 이동
  };

  const cancelSellBook = async (itemId) => {
    try {
      // 삭제 요청을 보내고 응답을 받음
      const response = await axios.delete(`http://localhost:3001/sellerbook/${itemId}`); //itemSellKey
      console.log(response.data); 
      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  };
  const handleCancelSellBook = (itemId) => {
  cancelSellBook(itemId);
};

  return (
    <div>
      {requests.map((request, index) => (
        <div className="sbk-purchase-req-card" key={index}>
{/*           <div className='sbk-list-inner-container'>
          </div> */}
          <img className="sbk-book-image" src={request.itemImg} alt={request.itemTitle} />
          <div className="sbk-text-container">
            <div className='sbk-main-container'>
              <h2 className="sbk-book-title">{request.itemTitle}</h2>
              <h2 className="sbk-book-info">{`${request.author} | ${request.publisher}`}</h2>
            </div>


            <div className='sbk-book-status'>
              <dl className='sbk-book-status-dl'>
                <dt className='sbk-book-status-dt'>도서상태</dt>
                <dd className='sbk-book-status-dd'>{request.damage === 0 ? '최상' : request.damage === 1 ? '상' : '중'}</dd>
              </dl>
              <dl className='sbk-book-status-dl'>
                <dt className='sbk-book-status-dt'>입찰가</dt>
                <dd className='sbk-book-status-dd'>{request.price}원</dd>
              </dl>
              <dl className='sbk-book-status-dl'>
                <dt className='sbk-book-status-dt'>입찰만료기한</dt>
                <dd className='sbk-book-status-dd' style={{ color: '#EB217C' }}>{request.expiry}</dd>
              </dl>
            </div>
          </div>

          <div className="sbk-button-container">
            {request.status === 2 ? ( /* 낙찰 상태면 낙찰 버튼 */
              <button className="sbk-cancel-button">낙찰</button>
              ) : (
                <button className="sbk-status-button" onClick={() => handleCancelSellBook(request.itemId)}>판매 입찰 취소</button> 
                )}
              <button className="sbk-status-button" onClick={() => handleStatusButtonClick(request.itemBuyKey)}>현황 보기</button> {/* */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalesHistoryList;