import React from 'react';
import '../styled/Rating.css'


function BookRating() {
  return (
    <div className="cyj_book-rating">
      <div className="tab">
        {/* DB 코드 받아와야함 */}
        <button className="tablinks">0</button>
        <button className="tablinks">0</button>
        <button className="tablinks">0</button>
      </div>

      <div className="rating-table">
        <div className="rating-row">
          <div className="rating-cell">최상</div>
          <div className="rating-cell">상</div>
          <div className="rating-cell">중</div>
        </div>
      </div>
    </div>
  );
}

export default BookRating;