
import React from 'react';
import '../styled/PurchaseReqList.css';


const SalesHistoryList = ({ requests }) => {
  return (
    <div>
      {requests.map((request, index) => (
        <div className="sbk-purchase-req-card" key={index}>
{/*           <div className='sbk-list-inner-container'>

          </div> */}
          <img className="sbk-book-image" src={request.image} alt={request.title} />
          <div className="sbk-text-container">
            <div className='sbk-main-container'>
              <h2 className="sbk-book-title">{request.title}</h2>
              <h2 className="sbk-book-info">{request.info}</h2>
            </div>


            <div className='sbk-book-status'>
              <dl className='sbk-book-status-dl'>
                <dt className='sbk-book-status-dt'>도서상태</dt>
                <dd className='sbk-book-status-dd'>{request.damage}</dd>
              </dl>
              <dl className='sbk-book-status-dl'>
                <dt className='sbk-book-status-dt'>입찰가</dt>
                <dd className='sbk-book-status-dd'>{request.price}</dd>
              </dl>
              <dl className='sbk-book-status-dl'>
                <dt className='sbk-book-status-dt'>입찰만료기한</dt>
                <dd className='sbk-book-status-dd' style={{ color: '#EB217C' }}>{request.expiry}</dd>
              </dl>
            </div>
          </div>

          <div className="sbk-button-container">
            {request.aucStatus ? (
              <button className="sbk-cancel-button">낙찰</button>
              ) : (
                <button className="sbk-status-button">판매 입찰 취소</button>
                )}
            <button className="sbk-status-button">현황 보기</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalesHistoryList;