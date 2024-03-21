import React, { useState } from "react";
import "../styled/DestForm.css";
import { defShippingData } from "../testData/defShippingData";  // TestData 폴더에 저장된 기본 배송지 정보를 가져옴

const DestForm = ({ isChecked }) => { // 페이지파일(= Purchase.js)에 있는 isChecked를 props로 받아옴
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [postCode, setPostCode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    else if (name === 'phone') setPhone(value);
    else if (name === 'postCode') setPostCode(value);
    else if (name === 'address') setAddress(value);
    else if (name === 'detailAddress') setDetailAddress(value);
  };

  return (
    <form className="yhw_destForm">
      <div className="yhw_destFormCont">
        <div className="yhw_destFormInputBox">
          <label>받는 사람</label>
          <input
            type="text"
            name="name"
            value={isChecked ? defShippingData.name : name}
            onChange={onChange}
          />
        </div>
        <div className="yhw_destFormInputBox">
          <label>핸드폰</label>
          <input
            type="text"
            name="phone"
            value={isChecked ? defShippingData.phone : phone}
            onChange={onChange}
          />
        </div>
        <div className="yhw_destFormInputBox">
          <label className="yhw_destFormAddrLabel">주소</label>
          <div className="yhw_destFomrInputAddrBox">
            <div className="yhw_destFormPostBox">
              <input
                className="yhw_destFormInputPostCode"
                type="number"
                name="postCode"
                value={isChecked ? defShippingData.postCode : postCode}
                onChange={onChange}
              />
              <span className="yhw_destFormSpanPostCode">우편번호</span>
            </div>
            <input
              type="text"
              name="address"
              value={isChecked ? defShippingData.address : address}
              onChange={onChange}
            />
            <input
              type="text"
              name="detailAddress"
              value={isChecked ? defShippingData.detailAddress : detailAddress}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default DestForm;