<<<<<<< HEAD
import '../../styled/Admin.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookEnroll() {
  const [buyerBooks, setBuyerBooks] = useState([]);

  useEffect(() => {
    fetchBuyerBooks();
  }, []);

  const fetchBuyerBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/buyerbook');
      setBuyerBooks(response.data);
    } catch (error) {
      console.error('Error fetching buyer books:', error);
    }
  };

  const [customerUserIds, setCustomerUserIds] = useState({});

  useEffect(() => {
    const fetchCustomerUserIds = async () => {
      const userIds = {};
      for (const buyerBook of buyerBooks) {
        try {
          const response = await axios.get(`http://localhost:3001/customers/${buyerBook.custKey}`);
          userIds[buyerBook.custKey] = response.data.userid;
        } catch (error) {
          console.error('Error fetching customer:', error);
          userIds[buyerBook.custKey] = ''; // 에러가 발생하면 빈 문자열로 설정
        }
      }
      setCustomerUserIds(userIds);
    };

    fetchCustomerUserIds();
  }, [buyerBooks]);

  return (
    <div className='jyh-table'>
      <p className='jyh-tb-title'>도서 등록 신청</p>
      <table className='jyh-bookenroll-table'>
        <thead>
          <tr>
            <th>번호</th>
            <th>아이디</th>
            <th>책 제목</th>
            <th>저자</th>
            <th>출판사</th>
          </tr>
        </thead>
        <tbody>
          {buyerBooks.map((buyerBook) => (
            <tr key={buyerBook.itemBuyKey}>
              <td>{buyerBook.itemBuyKey}</td>
              <td>{customerUserIds[buyerBook.custKey]}</td>
              <td>{buyerBook.itemTitle}</td>
              <td>{buyerBook.author}</td>
              <td>{buyerBook.publisher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookEnroll;
=======
import '../../styled/Admin.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookEnroll() {
  const [buyerBooks, setBuyerBooks] = useState([]);

  useEffect(() => {
    fetchBuyerBooks();
  }, []);

  const fetchBuyerBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/buyerbook');
      setBuyerBooks(response.data);
    } catch (error) {
      console.error('Error fetching buyer books:', error);
    }
  };

  const [customerUserIds, setCustomerUserIds] = useState({});

  useEffect(() => {
    const fetchCustomerUserIds = async () => {
      const userIds = {};
      for (const buyerBook of buyerBooks) {
        try {
          const response = await axios.get(`http://localhost:3001/customers/${buyerBook.custKey}`);
          userIds[buyerBook.custKey] = response.data.userid;
        } catch (error) {
          console.error('Error fetching customer:', error);
          userIds[buyerBook.custKey] = ''; // 에러가 발생하면 빈 문자열로 설정
        }
      }
      setCustomerUserIds(userIds);
    };

    fetchCustomerUserIds();
  }, [buyerBooks]);

  return (
    <div className='jyh-table'>
      <p className='jyh-tb-title'>도서 등록 신청</p>
      <table className='jyh-bookenroll-table'>
        <thead>
          <tr>
            <th>번호</th>
            <th>아이디</th>
            <th>책 제목</th>
            <th>저자</th>
            <th>출판사</th>
          </tr>
        </thead>
        <tbody>
          {buyerBooks.map((buyerBook) => (
            <tr key={buyerBook.itemBuyKey}>
              <td>{buyerBook.itemBuyKey}</td>
              <td>{customerUserIds[buyerBook.custKey]}</td>
              <td>{buyerBook.itemTitle}</td>
              <td>{buyerBook.author}</td>
              <td>{buyerBook.publisher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookEnroll;
>>>>>>> 0a52688d46b7c3c63d28aab634ecac2ab39febb0
