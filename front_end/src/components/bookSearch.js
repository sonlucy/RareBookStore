import React, { useState } from 'react';
import { bookSearch } from '../asset/bookApi.js';


const BookSearchComponent = () => {
  const [books, setBooks] = useState([]); // 검색 결과를 저장할 상태

  const bookSearchHandler = async (query) => {
    const params = {
      query: query,
      sort: 'accuracy',
      page: 1,
      size: 10,
    };
    try {
      const { data } = await bookSearch(params);
      setBooks(data.documents); // 검색 결과를 상태에 저장
      console.log(data); // 콘솔에도 출력
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  return (
    <div>
      <input type="text" onChange={(e) => bookSearchHandler(e.target.value)} placeholder="책 제목을 입력하세요" />
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <img src={book.thumbnail} alt={book.title} />
            <div>{book.title}</div>
            <div>{book.authors.join(', ')}</div>
            <div>{book.publisher}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookSearchComponent;
