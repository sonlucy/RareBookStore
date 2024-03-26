

/* import { BrowserRouter as Router } from 'react-router-dom'; */
import Header from '../components/Header';
import Footer from '../components/Footer';
import PurchaseReqForm from '../components/PurchaseReqForm';
import SalesHistoryList from '../components/SalesHistoryList';
import MyPageSide from '../components/MypageSide';
import { buyerBookData } from '../assets/buyerBook';

function SalesHistory() {
  return (
    <div className="App">

        <Header />

        <MyPageSide />

      <SalesHistoryList requests={buyerBookData} /> 

        <Footer />

    </div>
  );
}

export default SalesHistory;
