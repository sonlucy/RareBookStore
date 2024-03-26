

/* import { BrowserRouter as Router } from 'react-router-dom'; */
import Header from '../components/Header';
import Footer from '../components/Footer';
import PurchaseReqForm from '../components/PurchaseReqForm';
import SalesHistoryList from '../components/SalesHistoryList';
import MyPageSide from '../components/MypageSide';

const purchaseRequests = [
  {
    title: 'Book 1',
    info: "모건 하우절|문학동네",
    image: 'img/book.png',
    damage: '상',
    price: '11,000',
    expiry: '2020-12-12',
    aucStatus: true
  },
  {
    title: 'Book 2',
    info: "모건 하우절|문학동네",
    image: 'img/book.png',
    damage: '상',
    price: '12,000',
    expiry: '2020-12-12',
    aucStatus: false
  },

];

function SalesHistory() {
  return (
    <div className="App">

        <Header />

        <MyPageSide />

        <SalesHistoryList requests={purchaseRequests} /> 

        <Footer />

    </div>
  );
}

export default SalesHistory;
