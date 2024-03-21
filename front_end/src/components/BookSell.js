import React from 'react';
import '../styled/Sell.css'


function BookSell() {
  return (
    <div className="cyj_book-sell">
      <div className="tab">
        <button className="tablinks">0</button>
        <button className="tablinks">0</button>
        <button className="tablinks">0</button>
      </div>

      <div className="sell-table">
        <div className="sell-row">
          <div className="sell-cell">진행중</div>
          <div className="sell-cell">낙찰</div>
          <div className="sell-cell">기한만료</div>
        </div>
      </div>
    </div>
  );
}

export default BookSell;