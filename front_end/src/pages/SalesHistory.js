

/* import { BrowserRouter as Router } from 'react-router-dom'; */
import Header from '../components/Header';
import Footer from '../components/Footer';
import PurchaseReqForm from '../components/PurchaseReqForm';
import SalesHistoryList from '../components/SalesHistoryList';
import MyPageSide from '../components/MypageSide';
import { buyerBookData } from '../asset/buyerBook';
import DateInquiry from '../components/DateInquiry';

function SalesHistory() {
  return (
    <div className="App">

        <Header />
      <div style={{ display: 'flex' }}>
        <MyPageSide />
        <div className="sbk-container">
          <div className='sbk-purchase-request-form-title'>
            <h1>판매 내역</h1>
          </div>
          <DateInquiry/>
          <SalesHistoryList requests={buyerBookData} /> 
        </div>
      </div>
        

        <Footer />

    </div>
  );
}

export default SalesHistory;
