import React, { useState, useEffect, useContext, useCallback } from "react";
import "../styled/DestForm.css";
import { LoginContext } from "./LoginContext";
import axios from "axios";

const DestForm = ({ handleUserAddrChange }) => {
  // 페이지파일(= Purchase.js)에 있는 isChecked를 props로 받아옴
  const { loginUser } = useContext(LoginContext);
  const [user, setUser] = useState([]);
  const [isChecked, setIsChecked] = useState(false); // 체크하기!!!!!!!!!!!!
  const [userAddr, setUserAddr] = useState({
    custKey: loginUser,
    name: "",
    tel: "",
    postcode: "",
    addr: "",
    addrDetail: "",
  });
  const [getAddr, setGetAddr] = useState([]);

  const checked = () => {
    setIsChecked(!isChecked);   // isChecked 상태 토글
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUserAddr({ ...userAddr, [name]: value });
    handleUserAddrChange(userAddr);
  };

  const defaultAddress = getAddr.find((address) => address.defaultAddr === "Y");

  useEffect(() => {
    console.log(isChecked, "isChecked 값");
    console.log(defaultAddress, "defaultAddress 값");
    const updateUserAddr = () => {
      if (defaultAddress && !isChecked) { // isChecked의 초깃값이 false이기 때문에 false가 아닌 경우(= ture)에 실행
        setUserAddr({
          custKey: loginUser,
          name: defaultAddress.name,
          tel: defaultAddress.tel,
          postcode: defaultAddress.postcode,
          addr: defaultAddress.addr,
          addrDetail: defaultAddress.addrDetail,
        });
        console.log("체크박스 클릭후 디폴트 주소 저장됨:", isChecked);
      } else {
        setUserAddr({
          custKey: loginUser,
          name: "",
          tel: "",
          postcode: "",
          addr: "",
          addrDetail: "",
        });
        console.log("체크박스 해제후 주소 초기화:", isChecked);
      }
    };
  
    updateUserAddr(); // 최초 렌더링 시 업데이트
  
    // 업데이트된 userAddr를 처리
    handleUserAddrChange(userAddr);
  }, [defaultAddress, isChecked]);

  // 성능 최적화를 위해 useCallback 사용
  // useCallback 훅은 함수를 메모이제이션하여 불필요한 렌더링을 방지
  const getCustomer = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/customers/${loginUser}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  }, [loginUser]);
  
  useEffect(() => {
    getCustomer();
  }, [getCustomer]);

  const getCustomerAddr = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/address/${loginUser}`
      );
      setGetAddr(response.data);
    } catch (error) {
      console.error("Error fetching customer address:", error);
    }
  }, [loginUser]);
  
  useEffect(() => {
    getCustomerAddr();
  }, [getCustomerAddr]);

  return (
    <>
      <div className="yhw_purDefDestCheckForm">
        <input
          type="checkbox"
          value=""
          id="flexCheckDefault"
          checked={isChecked} // 만약 isChecked가 true이면 checkbox가 선택된 상태로 표시됨
          onChange={checked}
        />
        <label htmlFor="flexCheckDefault">기본 배송지로 배송</label>
      </div>

      <form className="yhw_destForm">
        {/* 주소 목록 출력 */}
        {getAddr.length > 0 ? (
          getAddr.map((address, i) =>
            address.defaultAddr === "Y" ? (
              <>
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
                      name="tel"
                      // name="phone"
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
                          name="postcode"
                          // name="postCode"
                          value={
                            isChecked ? address.postcode : userAddr.postcode
                          }
                          onChange={handleInputChange}
                        />
                        <span className="yhw_destFormSpanPostCode">
                          우편번호
                        </span>
                      </div>
                      <input
                        type="text"
                        name="addr"
                        // name="address"
                        value={isChecked ? address.addr : userAddr.addr}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        name="addrDetail"
                        // name="detailAddress"
                        value={
                          isChecked ? address.addrDetail : userAddr.addrDetail
                        }
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : null
          )
        ) : (
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
                name="tel"
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
    </>
  );
};

export default DestForm;
