import { BrowserRouter as Router } from 'react-router-dom';
import '../styled/SellerInfo.css'

function SellerInfo({ sellerInfoList }) {
  const totalReviews = sellerInfoList.reduce((total, seller) => total + seller.reviews.length, 0);
  const totalItemsSold = sellerInfoList.reduce((total, seller) => total + seller.itemSellKeys.length, 0);

  return (
      <div className="sbk-seller-info-container">
        {sellerInfoList.map((sellerInfo, index) => (
          <div key={index} className="sbk-seller-info">
            <div className="sbk-seller-info-heading">
              <h1>판매자 정보 보기</h1>
              <h2>{sellerInfo.sellerName}</h2>
            </div>

            <div className="sbk-seller-info-grade">
              <h2>판매자 등급</h2>
              <hr className='sbk-seller-hr' />
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
              <div className='sbk-flex-container'>
                <h2>판매자 후기</h2>
                <h2>
                  <span style={{ color: '#828282' }}>{`${totalReviews}`}</span> {/* 리뷰 개수 동적으로 받아와서 표시 */}
                </h2>
              </div>
              <hr className='sbk-seller-hr' />
              {sellerInfo.reviews.map((review, index) => (
                <div key={index} className="sbk-review">
                  <span className="sbk-review-buyer-name">{review.buyerName} </span>
                  <span className="sbk-review-content">{review.review}</span>
                </div>
              ))}
            </div>


            <div className="sbk-seller-info-reviews">
            <div className='sbk-flex-container'>
              <h2>판매 개수</h2>
              <h2>
                <span style={{ color: '#828282' }}>{`${totalItemsSold}`}</span> {/* 리뷰 개수 동적으로 받아와서 표시 */}
              </h2>
            </div>
            </div>

          </div>
          
        ))}
        
      </div>
  );
}

export default SellerInfo;
