import React, { useState, useEffect } from 'react';
import '../styled/BookStateCategory.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PurchaseReqForm from '../components/PurchaseReqForm';
import PurchaseReqListOngoing from '../components/PurchaseReqListOngoing';
import PurchaseReqListEnd from '../components/PurchaseReqListEnd';
import SalesHistoryList from '../components/SalesHistoryList';
import MyPageSide from '../components/MypageSide';
import BookSell from '../components/BookSell';
import { buyerBookData } from '../assets/buyerBook';

function RegRequest() {
  const [selectedTab, setSelectedTab] = useState('진행중');
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    setSelectedTab('진행중');
    filterRequests('진행중');
  }, []); 

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    filterRequests(tab);
  };

  const filterRequests = (tab) => {
    let filtered = [];
    if (tab === '진행중') {
      filtered = buyerBookData.filter(request => request.aucStatus === 2);
    } else if (tab === '낙찰') {
      filtered = buyerBookData.filter(request => request.aucStatus === 1);
    } else if (tab === '기한만료') {
      filtered = buyerBookData.filter(request => request.aucStatus === 3);
    }
    setFilteredRequests(filtered);
  };

  return (
    <div className="App">
      <Header />
      <div style={{ display: 'flex' }}>
        <MyPageSide />
        <div className="sbk-container">
          <div className='sbk-purchase-request-form-title'>
            <h1>구매 희망 도서 등록</h1>
            <hr className='sbk-purchase-request-form-hr' />
          </div>
          <PurchaseReqForm />
          <div className='sbk-purchase-request-form-title'>
            <h1>구매 희망 도서 신청내역</h1>
          </div>
          <BookSell onSelect={handleTabChange} requests={buyerBookData} />{/*  */}
          <div className='sbk-purchase-request-form-title'>
            <h3 className='sbk-purchase-request-form-item-quantity'>상품 전체 &nbsp;{filteredRequests.length}</h3>
          </div>
          {selectedTab === '진행중' && <PurchaseReqListOngoing requests={filteredRequests} />}
          {selectedTab !== '진행중' && <PurchaseReqListEnd requests={filteredRequests} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegRequest;
