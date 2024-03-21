

import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PurchaseReqForm from '../components/PurchaseReqForm';
import PurchaseReqListOngoing from '../components/PurchaseReqListOngoing';
import PurchaseReqListEnd from '../components/PurchaseReqListEnd';

const purchaseRequests = [
  {
    title: 'Book 1',
    info: "모건 하우절|문학동네",
    image: 'img/book.png'
  },
  {
    title: 'Book 2',
    info: "모건 하우절|문학동네",
    image: 'img/book.png'
  },

];

function RegRequest() {
  return (
    <div className="App">
      <Router>
        <Header />


        <PurchaseReqForm />

        {/* 배열을 넘겨주는 방법. */}
        <PurchaseReqListOngoing requests={purchaseRequests} /> {/* 페이지에 따라 하나만 써야함 */}
        <PurchaseReqListEnd requests={purchaseRequests} /> {/* 버튼 없는 버전 */}


        {/* 개별로 넘겨주는 방법 */}
        {/*       <PurchaseReqListOngoing title="폴링인 폴" info="모건 하우절|문학동네" image="img/book.png"/>
        <PurchaseReqListEnd title="폴링인 폴" info="모건 하우절|문학동네" image="img/book.png" /> */}

        <br /><br />

        <Footer />
      </Router>
    </div>
  );
}

export default RegRequest;
