

import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styled/SellerInfo.css'


function SellerInfo({ sellerInfoList }) {
  return (
    <Router>
        <Header />

      <div className="sbk-seller-info-container">
        {sellerInfoList.map((sellerInfo, index) => (
          <div key={index} className="sbk-seller-info">
            <div className="sbk-seller-info-heading">
              <h1>판매자 정보 보기</h1>
              <h2>{sellerInfo.sellerName}</h2>
            </div>

            <div className="sbk-seller-info-grade">
              <h2>판매자 등급</h2>
              <hr className='sbk-seller-hr'/>
              <div className='sbk-seller-info-grade-container'>
                <span className="sbk-seller-info-label">현재등급 </span>
                <span className="sbk-seller-info-value">{sellerInfo.grade}</span>  
              </div>
              <div className='sbk-seller-info-grade-container'>
                <span className="sbk-seller-info-label">현재점수 </span>
                <span className="sbk-seller-info-value">{sellerInfo.point}</span>
              </div>
            </div>

            <div className="sbk-seller-info-reviews">
              <h2>판매자 후기</h2>
              <hr className='sbk-seller-hr' />
              {sellerInfo.reviews.map((review, index) => (
                <div key={index} className="sbk-review">
                  <span className="sbk-review-buyer-name">{review.buyerName} </span>
                  <span className="sbk-review-content">{review.review}</span>
                </div>
              ))}

            </div>
          </div>
        ))}
      </div>
        <Footer />
      </Router>
  );
}

export default SellerInfo;
