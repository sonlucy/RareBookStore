

import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PurchaseReqForm from '../components/PurchaseReqForm';
import SalesHistoryList from '../components/SalesHistoryList';

const purchaseRequests = [
  {
    title: 'Book 1',
    info: "모건 하우절|문학동네",
    image: 'img/book.png',
    damage: '상',
    price: '11000',
    expiry: '2020-12-12',
    aucStatus: true
  },
  {
    title: 'Book 2',
    info: "모건 하우절|문학동네",
    image: 'img/book.png',
    damage: '상',
    price: '11000',
    expiry: '2020-12-12',
    aucStatus: false
  },

];

function SalesHistory() {
  return (
    <div className="App">
      <Router>
        <Header />



        <SalesHistoryList requests={purchaseRequests} /> {/* 판매내역 부분 확인 */}

        <br /><br />

        <Footer />
      </Router>
    </div>
  );
}

export default SalesHistory;
