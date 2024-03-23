import React from 'react';
import '../styled/AddressView.css';
import MypageSide from '../components/MypageSide';
import DestForm from '../components//DestForm';
import DefDestCheck from '../components//DefDestCheck';

function Address() {
  return (
    <div className="cyj_content_area Address-content">
      {/* 사이드바 넣는 곳 */}
       <div className="Address-sidebar">
        <MypageSide />
      </div>
      <div className="my_Address">
        <div className="my_Address_title">
          <h3 className="title">배송지 입력</h3>
        </div>
        <div className="recent_purchase">
          {/* 배송지 폼 컴포넌트 들어가는 곳 */}
          <DestForm />
        </div>
        <div className="recent_purchase">
         {/* 체크박스 넣는 곳 */}
          <DefDestCheck />
        </div>
      </div>
    </div>
  );
}

export default Address;
