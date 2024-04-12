import React from "react";
import "../styled/DestForm.css";
import useUserAddr from "../hooks/api/useUserAddr"; // usePurInfoData 훅 임포트

const DestForm = ({ isChecked }) => { // 페이지파일(= Purchase.js)에 있는 isChecked를 props로 받아옴
  const { userAddr, setUserAddr, getAddr, setGetAddr } = useUserAddr();  // useUserAddr 훅 사용

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserAddr({ ...userAddr, [name]: value });
  };

  return (
    <form className="yhw_destForm">
      {/* 주소 목록 출력 */}
      {/* {getAddr.length > 0 ? ( */}
      {/* {getAddr && getAddr.length > 0 && ( */}
      {getAddr.length > 0 && (
        getAddr.map((address, i) => (address.defaultAddr === 'Y' ? (  // defaultAddr가 Y인 것의 address 값들 가져옴
          <div key={i}>
            <div className="yhw_destFormInputBox">
              <label>받는 사람</label>
              <input
                type="text"
                name="name"
                value={isChecked ? address.name : userAddr.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="yhw_destFormInputBox">
              <label>핸드폰</label>
              <input
                type="text"
                name="phone"
                value={isChecked ? address.tel : userAddr.tel}
                onChange={handleInputChange}
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
                    value={isChecked ? address.postcode : userAddr.postcode}
                    onChange={handleInputChange}
                  />
                  <span className="yhw_destFormSpanPostCode">우편번호</span>
                </div>
                <input
                  type="text"
                  name="address"
                  value={isChecked ? address.addr : userAddr.addr}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="detailAddress"
                  value={isChecked ? address.addrDetail : userAddr.addrDetail}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
         ) : null
         ))
       )}
    {/* //   ))
    // ) : (
    // )}
    // 주소 목록이 비어있을 경우 */}
    {/*// {getAddr && getAddr.length === 0 && (*/}
      {getAddr.length === 0 && (
        <>
          <div className="yhw_destFormInputBox">
            <label>받는 사람</label>
            <input
              type="text"
              name="name"
              value={userAddr.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="yhw_destFormInputBox">
            <label>핸드폰</label>
            <input
              type="text"
              name="phone"
              value={userAddr.tel}
              onChange={handleInputChange}
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
                  value={userAddr.postcode}
                  onChange={handleInputChange}
                />
                <span className="yhw_destFormSpanPostCode">우편번호</span>
              </div>
              <input
                type="text"
                name="address"
                value={userAddr.addr}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="detailAddress"
                value={userAddr.addrDetail}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default DestForm;