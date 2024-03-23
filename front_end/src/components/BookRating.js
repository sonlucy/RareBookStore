import React from 'react';
import '../styled/BookStateCategory.css';


function BookRating() {
  return (
    <div className="cyj_book-category">
      <div className="tab">
        {/* DB 코드 받아와야함 */}
        <button className="tablinks">0</button>
        <button className="tablinks">0</button>
        <button className="tablinks">0</button>
      </div>

      <div className="category-table">
        <div className="category-row">
          <div className="category-cell">최상</div>
          <div className="category-cell">상</div>
          <div className="category-cell">중</div>
        </div>
      </div>
    </div>
  );
}

export default BookRating;
