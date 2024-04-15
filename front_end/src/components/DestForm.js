import React, { useState, useEffect, useContext } from "react";
import "../styled/DestForm.css";
// import { defShippingData } from "../asset/defShippingData";  // TestData 폴더에 저장된 기본 배송지 정보를 가져옴
import { LoginContext } from "../components/LoginContext";
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
    if (defaultAddress && isChecked) {
      setUserAddr({
        custKey: loginUser,
        name: defaultAddress.name,
        tel: defaultAddress.tel,
        postcode: defaultAddress.postcode,
        addr: defaultAddress.addr,
        addrDetail: defaultAddress.addrDetail,
      });
      console.log("체크박스 클릭후 디폴트 주소 저장됨:", isChecked);
      handleUserAddrChange(userAddr);
    } else {
      setUserAddr({
        custKey: loginUser,
        name: "",
        tel: "",
        postcode: "",
        addr: "",
        addrDetail: "",
      });
      handleUserAddrChange(userAddr);
      console.log("체크박스 해제후 주소 초기화:", isChecked);
    }
  }, [defaultAddress, isChecked]);

  const checked = () => {
    setIsChecked(!isChecked);
  };

  const getCustomer = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/customers/${loginUser}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const getCustomerAddr = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/address/${loginUser}`
      );
      setGetAddr(response.data);
    } catch (error) {
      console.error("고객의 주소를 가져올수 없습니다.", error);
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);

  useEffect(() => {
    getCustomerAddr();
    checked();
  }, [user]);

  return (
    <>
      <div className="yhw_purDefDestCheckForm">
        <input
          type="checkbox"
          value=""
          id="flexCheckDefault"
          onChange={checked}
        />
        <label htmlFor="flexCheckDefault">새로운 배송지로 배송</label>
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
