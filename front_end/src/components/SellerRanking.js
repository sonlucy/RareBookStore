// import { BrowserRouter as Router } from 'react-router-dom';
import '../styled/SellerInfo.css'
import '../styled/SellerRanking.css'

function SellerRanking({ sellerInfoList }) {
  return (
      <div className="jyh-seller-info-container">
        {sellerInfoList.map((sellerInfo, index) => (
          <div key={index} className="sbk-seller-info">
            <div className='jyh-seller-info'>
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

            <div className="sbk-seller-info-grade">
              <h2>판매 등급 산정 기준</h2>
              <hr className='sbk-seller-hr' />
              <div className='sbk-seller-info-grade-container'>
                <span className="sbk-seller-info-value">1</span>
                <span className="jyh-seller-info-label">판매자 점수 4.5 이상 </span>
              </div>
              <div className='sbk-seller-info-grade-container'>
                <span className="sbk-seller-info-value">2</span>
                <span className="jyh-seller-info-label">판매자 점수 3.5 이상 4.5 미만 </span>
              </div>
              <div className='sbk-seller-info-grade-container'>
                <span className="sbk-seller-info-value">3</span>
                <span className="jyh-seller-info-label">판매자 점수 2.5 이상 3.5 미만 </span>
              </div>
              <div className='sbk-seller-info-grade-container'>
                <span className="sbk-seller-info-value">4</span>
                <span className="jyh-seller-info-label">판매자 점수 1.5 이상 2.5 미만 </span>
              </div>
              <div className='sbk-seller-info-grade-container'>
                <span className="sbk-seller-info-value">5</span>
                <span className="jyh-seller-info-label">판매자 점수 1.5 미만 </span>
              </div>
            </div>
            </div>

          </div>

        
          
        ))}
        
      </div>
  );
}

export default SellerRanking;
