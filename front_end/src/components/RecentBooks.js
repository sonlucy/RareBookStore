import React, { useState, useRef, useEffect } from 'react';
import '../styled/RecentBooks.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RecentBooks = ({ books, titleText }) => {
  const containerRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
const [hoverAreaWidth, setHoverAreaWidth] = useState(100); // 초기값 설정

useEffect(() => {
  // 화면 크기가 변경될 때마다 hoverAreaWidth를 업데이트
  const updateHoverAreaWidth = () => {
    const screenWidth = window.innerWidth;
    // 화면 크기에 따라 hover 영역의 너비를 동적으로 설정
    if (screenWidth <= 425) {
      setHoverAreaWidth(50); 
    } else if (screenWidth <= 768) {
      setHoverAreaWidth(100);
    } else if (screenWidth <= 1440) {
      setHoverAreaWidth(180); 
    } else {
      setHoverAreaWidth(300); 
    }
  };

  // 컴포넌트가 마운트될 때 한 번 실행
  updateHoverAreaWidth();

  // 화면 크기 변경 이벤트 리스너 등록
  window.addEventListener('resize', updateHoverAreaWidth);

  // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
  return () => {
    window.removeEventListener('resize', updateHoverAreaWidth);
  };
}, []);

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


const handleMouseHover = (event) => {
  const containerRect = containerRef.current.getBoundingClientRect();
  const containerWidth = containerRef.current.clientWidth;
  const mousePositionX = event.clientX - containerRect.left;
  //const hoverAreaWidth = 100;
  const visibleCount = Math.floor(containerRef.current.clientWidth / cardWidth);

  // 마우스가 왼쪽 영역에 있는지 확인
  const isLeftHover = mousePositionX <= hoverAreaWidth;
  // 마우스가 오른쪽 영역에 있는지 확인
  const isRightHover = mousePositionX >= containerWidth - hoverAreaWidth;

  // 이전에 설정된 타이머가 있다면 취소
  if (intervalId) {
    clearTimeout(intervalId);
  }

  // 일정 시간 후에 호버 상태를 확인하고 인덱스 업데이트
  const newIntervalId = setTimeout(() => {
    if (isLeftHover) {
      // 왼쪽 영역에 호버한 경우
      const prevIndex = Math.max(startIndex - 1, 0);
      setStartIndex(prevIndex);
    } else if (isRightHover) {
      // 오른쪽 영역에 호버한 경우
      const nextIndex = Math.min(startIndex + 1, books.length - visibleCount);
      setStartIndex(nextIndex);
    }
  }, 50); 

  // 새로운 타이머 ID 저장
  setIntervalId(newIntervalId);
};




  const handlePrev = () => {
    const visibleCount = Math.floor(containerRef.current.clientWidth / cardWidth);
    const prevIndex = Math.max(startIndex - 1, 0);
    setStartIndex(prevIndex);
  };

  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex + 1 >= books.length;

  console.log(books, "books보기")
  return (
    <div className='sbk-RecentContainer'>
      <Link to="/CategoryBookList/all" className='sbk-BookListLink'>
        <h2>{titleText}  <FaChevronRight /></h2>  {/* 클릭하면 도서리스트 페이지로 이동 */}
      </Link>
      <div className="sbk-SliderContainer" onMouseMove={(event) => handleMouseHover(event)} ref={containerRef}>


        <button className="sbk-PrevButton" onClick={handlePrev} disabled={isPrevDisabled}>
          <span className="sbk-Icon">
            <FaChevronLeft />
          </span>
        </button>
        <div className="sbk-BookCardContainer" style={{ transform: `translateX(-${startIndex * cardWidth}px)` }}>
          {books.map((book, index) => (
            <div key={index} className="sbk-BookCard" style={{ animationDelay: `${index * 0.1}s` }}>
              {(book.itemBuyKey && book.status === 2) ? ( // itemBuyKey가 있고, status가 2인 경우
                <Link to={`/SellBook/${book.itemBuyKey}`}> {/* 최근 구매 희망 도서 */}
                  <img src={book.image} className='sbk-recent-image-link' title='판매하러 가기' alt={book.title} style={{ width: `${cardWidth - 20}px` }} />
                </Link>
              ) : (book.itemBuyKey && book.status !== 2) ? ( // itemBuyKey가 있고, status가 2가 아닌 경우
                <img src={book.image} title='이미 판매된 도서' alt={book.title} style={{ width: `${cardWidth - 20}px` }} />
              ) : ( // itemBuyKey가 없는 경우
                <img src={book.image} alt={book.title} style={{ width: `${cardWidth - 20}px` }} />
              )}
              <h3 style={{ color: (book.itemBuyKey && book.status === 2) ? '#CB7266' : 'black' }}>{book.title}</h3>
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
