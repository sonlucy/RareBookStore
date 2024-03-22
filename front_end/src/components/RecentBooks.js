import React, { useState, useRef, useEffect } from 'react';
import '../styled/RecentBooks.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RecentBooks = ({ books, titleText }) => {
  const containerRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 도서 카드의 너비를 측정하여 상태로 저장
    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => {
      window.removeEventListener('resize', updateCardWidth);
    };
  }, []);


  const updateCardWidth = () => {
    if (containerRef.current) {
      let imageWidth;
      if (window.innerWidth <= 425) {
        imageWidth = 100;
      } else if (window.innerWidth <= 768) {
        imageWidth = 150;
      } else if (window.innerWidth <= 1440) {
        imageWidth = 200;
      } else {
        imageWidth = 250;
      }
      setCardWidth(imageWidth + 20); // 도서 이미지 너비 + 마진
    }
  };
  const handleNext = () => {
    const visibleCount = Math.floor(containerRef.current.clientWidth / cardWidth);
    const nextIndex = Math.min(startIndex + 1, books.length - visibleCount);
    setStartIndex(nextIndex);
  };

  const handlePrev = () => {
    const visibleCount = Math.floor(containerRef.current.clientWidth / cardWidth);
    const prevIndex = Math.max(startIndex - 1, 0);
    setStartIndex(prevIndex);
  };

  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex + 1 >= books.length;

  return (
    <div className='sbk-RecentContainer'>
      <Link to="/booklist" className='sbk-BookListLink'>
        <h2>{titleText}  <FaChevronRight /></h2>  {/* 클릭하면 도서리스트 페이지로 이동 */}
      </Link>
      <div className="sbk-SliderContainer" ref={containerRef}>
        <button className="sbk-PrevButton" onClick={handlePrev} disabled={isPrevDisabled}>
          <span className="sbk-Icon">
            <FaChevronLeft />
          </span>
        </button>
        <div className="sbk-BookCardContainer" style={{ transform: `translateX(-${startIndex * cardWidth}px)` }}>
          {books.map((book, index) => (
            <div key={index} className="sbk-BookCard">
              <img src={book.image} alt={book.title} style={{ width: `${cardWidth - 20}px` }} />
              <h3>{book.title}</h3>
            </div>
          ))}
        </div>
        <button className="sbk-NextButton" onClick={handleNext} disabled={isNextDisabled}>
          <span className="sbk-Icon">
            <FaChevronRight />
          </span>
        </button>
      </div>
    </div >
  );
};

export default RecentBooks;
