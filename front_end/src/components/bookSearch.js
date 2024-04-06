import React, { useState } from 'react';
import axios from 'axios';
import '../styled/BookSearch.css';
import { FaSearch } from "react-icons/fa";
import '../styled/Pagination.css'

function BookSearch({ onSelectBook }) {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;
    const pageGroupSize = 5;

    const handleSearch = async () => {
        try {
            console.log('Request sent to server:', {
                query: query, // 검색어
            });

            const encodedQuery = encodeURIComponent(query); // 한글 검색어를 UTF-8 형식으로 인코딩
            const response = await axios.get(`/Mypage/search/book?query=${encodedQuery}`);
            setSearchResults(response.data.items);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEnterKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    const handleBookSelect = (item) => {
        onSelectBook(item);
    };

    // 현재 페이지에 해당하는 도서 목록 반환
    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return searchResults.slice(startIndex, endIndex);
    };

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(searchResults.length / itemsPerPage);

    // 현재 페이지 그룹 번호 계산
    const currentPageGroup = Math.ceil(currentPage / pageGroupSize);

    // 페이지 그룹의 시작과 끝 페이지 번호 계산
    const startPage = (currentPageGroup - 1) * pageGroupSize + 1;
    const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

    // 이전 페이지 그룹으로 이동
    const goToPrevPageGroup = () => {
        setCurrentPage(startPage - 1);
    };

    // 다음 페이지 그룹으로 이동
    const goToNextPageGroup = () => {
        setCurrentPage(endPage + 1);
    };

    // 검색어 키워드 스타일링
    const highlightSearchKeyword = (title) => {
        const index = title.toLowerCase().indexOf(query.toLowerCase());
        if (index !== -1) {
            return (
                <>
                    {title.substring(0, index)}
                    <span style={{ fontWeight: 'bold', color: '#C87E66', backgroundColor: '#eee' }}>
                        {title.substring(index, index + query.length)}
                    </span>
                    {title.substring(index + query.length)}
                </>
            );
        }
        return title;
    };

    return (
        <div>
            <div className="sbk-search-container">
                <FaSearch className="sbk-search-icon" />
                <input
                    type="text"
                    className="sbk-search-input"
                    placeholder="   검색할 도서명을 입력하세요"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleEnterKeyDown}
                />
                <button className="sbk-search-button" onClick={handleSearch}>검색</button>
            </div>

            <div className='jyh-bookSearchResult'>
                {getCurrentPageItems().map((item, index) => (
                    <div key={index} onClick={() => handleBookSelect(item)}>
                        <div className='jyh-bookSearch-box'>
                            <img className='jyh-bookSearch-img' src={item.image}></img>
                            <div className='jyh-bookSerch-contents'>
                                <p className='jyh-bookSearch-title'>
                                    {highlightSearchKeyword(item.title)}
                                </p>
                                <p className='jyh-bookSearch-author'>저자: {item.author}</p>
                                <p className='jyh-bookSearch-publisher'>출판사: {item.publisher}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button onClick={goToPrevPageGroup} disabled={currentPageGroup === 1}>{'<'}</button>
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                    <button
                        key={startPage + i}
                        onClick={() => setCurrentPage(startPage + i)}
                        className={currentPage === startPage + i ? 'active' : ''}
                    >
                        {startPage + i}
                    </button>
                ))}
                <button onClick={goToNextPageGroup} disabled={endPage === totalPages}>{'>'}</button>
            </div>
        </div>
    );
}

export default BookSearch;
