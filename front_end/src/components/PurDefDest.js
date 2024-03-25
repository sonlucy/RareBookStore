import React from "react";
import "../styled/PurDefDest.css";
import { defShippingData } from "../asset/defShippingData";  // TestData 폴더에 저장된 기본 배송지 정보를 가져옴

const PurDefDest = () => {
  // 이름을 성과 이름으로 분리하여 성만 출력하고, 이름은 **로 대체하여 반환하는 함수
  const formatName = (fullName) => {
    const lastName = fullName.substring(0, 1);  // 성
    const firstName = fullName.substring(1);  // 이름
    const maskedName = lastName + firstName.replace(/./g, "*");
    return `${maskedName}`;
  };

  // 전화번호를 -로 분리하여 앞자리와 뒷자리 사이에 ****를 넣어 반환하는 함수
  const formatPhone = (phone) => {
    const phoneParts = phone.split('-');
    const first = phoneParts[0];
    // const second = phoneParts[1];
    const third = phoneParts[2];
    return `${first}-****-${third}`;
  };
  
  return (
    <div className="yhw_defShippingInfoBox">
      {/* 성만 출력하고, 이름은 **으로 대체하여 표시 */}
      <span>{formatName(defShippingData.name)}</span>
      <span>{formatPhone(defShippingData.phone)}</span>
      <span>&#40;{defShippingData.postCode}&#41; {defShippingData.address} {defShippingData.detailAddress}</span>
    </div>
  );
}

export default PurDefDest;