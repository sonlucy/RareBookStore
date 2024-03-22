import React from 'react';
import '../styled/PurchaseReqList.css';

/* const PurchaseReqListEnd = ({ title, info, image }) => {
  return (
    <div className="sbk-purchase-req-card">
      <img className="sbk-book-image" src={image} alt={title} />
      <div className="sbk-text-container">
        <h2 className="sbk-book-title">{title}</h2>
        <h2 className="sbk-book-info">{info}</h2>
      </div>

    </div>
  );
};

export default PurchaseReqListEnd; */

const PurchaseReqListEnd = ({ requests }) => {
  return (
    <div>
      {requests.map((request, index) => (
        <div className="sbk-purchase-req-card" key={index}>
          <img className="sbk-book-image" src={request.image} alt={request.title} />
          <div className="sbk-text-container">
            <h2 className="sbk-book-title">{request.title}</h2>
            <h2 className="sbk-book-info">{request.info}</h2>

          </div>

        </div>
      ))}
    </div>
  );
};

export default PurchaseReqListEnd;