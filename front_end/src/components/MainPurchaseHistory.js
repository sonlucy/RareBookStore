import React from 'react';
import '../styled/MainPurchase.css'


function PurchaseHistory() {
  return (
    <div className="cyj_Purchase-main">
      <div className="tab">
        <button className="tablinks">전체</button>
        <button className="tablinks">입찰중</button>
        <button className="tablinks">진행중</button>
        <button className="tablinks">종료</button>
      </div>

      <div className="Purchase-table">
        <div className="Purchase-row">
           {/* DB 코드 받아와야함 */}
          <div className="Purchase-cell">0</div>
          <div className="Purchase-cell">0</div>
          <div className="Purchase-cell">0</div>
          <div className="Purchase-cell">0</div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseHistory;