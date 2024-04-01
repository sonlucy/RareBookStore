

/* import { BrowserRouter as Router } from 'react-router-dom'; */
import Header from '../components/Header';
import Footer from '../components/Footer';
import PurchaseReqForm from '../components/PurchaseReqForm';
import SalesHistoryList from '../components/SalesHistoryList';
import MyPageSide from '../components/MypageSide';
import { buyerBookData } from '../asset/buyerBook';
import DateInquiry from '../components/DateInquiry';
import "../styled/PurchaseHistory.css";


function SalesHistory() {
  return (
    <div className="App">


      <Header />

      <div className="yhw_container">
        <div className="yhw_purHistCont">
          <div className="yhw_MypageSideAdd">
            <MyPageSide />
          </div>
          <div className="yhw_purHistMainCont">
            <div className="yhw_purHistTopCont">
              <b>판매내역</b>
              <DateInquiry /> {/* 날짜 조회 컴포넌트 일단 대충 만들어둠 */}
            </div>
            
              
              {/* 구매 정보 표시 */}
              <SalesHistoryList requests={buyerBookData} />
            
          </div>
        </div>
      </div>

      <Footer />

 
</div>
  );
}

export default SalesHistory;