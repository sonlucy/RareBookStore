import React, { useState } from 'react';
import '../styled/BookStateCategory.css';

function BookSell({ onSelect }) {
  const [selectedTab, setSelectedTab] = useState('진행중');

  const handleClick = (tab) => {
    setSelectedTab(tab);
    onSelect(tab);
  };

  return (
    <div className="cyj_book-category">
      <div className="tab">
        <button
          className={selectedTab === '진행중' ? 'tablinks active' : 'tablinks'}
          onClick={() => handleClick('진행중')}
        >
          진행중
        </button>
        <button
          className={selectedTab === '낙찰' ? 'tablinks active' : 'tablinks'}
          onClick={() => handleClick('낙찰')}
        >
          낙찰
        </button>
        <button
          className={selectedTab === '기한만료' ? 'tablinks active' : 'tablinks'}
          onClick={() => handleClick('기한만료')}
        >
          기한만료
        </button>
      </div>
    </div>
  );
}

export default BookSell;
