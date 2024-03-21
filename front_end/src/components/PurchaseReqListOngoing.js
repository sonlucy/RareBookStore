/* import React from 'react';
import '../styled/PurchaseReqList.css';

const PurchaseReqListOngoing = ({ title, info, image }) => {
  return (
    <div className="sbk-purchase-req-card">
      <img className="sbk-book-image" src={image} alt={title} />
      <div className="sbk-text-container">
        <h2 className="sbk-book-title">{title}</h2>
        <h2 className="sbk-book-info">{info}</h2>
      </div>
      <div className="sbk-button-container">
        <button className="sbk-status-button">현황 보기</button>
        <button className="sbk-cancel-button">상품등록 취소</button>
      </div>
    </div>
  );
};

export default PurchaseReqListOngoing;
 */

import React from 'react';
import '../styled/PurchaseReqList.css';

const PurchaseReqListOngoing = ({ requests }) => {
  return (
    <div>
      {requests.map((request, index) => (
        <div className="sbk-purchase-req-card" key={index}>
          <img className="sbk-book-image" src={request.image} alt={request.title} />
          <div className="sbk-text-container">
            <h2 className="sbk-book-title">{request.title}</h2>
            <h2 className="sbk-book-info">{request.info}</h2>

          </div>
          <div className="sbk-button-container">
            <button className="sbk-status-button">현황 보기</button>
            <button className="sbk-cancel-button">상품등록 취소</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchaseReqListOngoing;