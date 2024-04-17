import React, { useState, useEffect, useContext } from "react";
import "../styled/DestForm.css";
import { LoginContext } from "./LoginContext";
import axios from "axios";

const DestForm = ({ handleUserAddrChange }) => {
  // 페이지파일(= Purchase.js)에 있는 isChecked를 props로 받아옴
  const { loginUser } = useContext(LoginContext);
  const [user, setUser] = useState([]);
  // const [isChecked, setIsChecked] = useState(false); // 체크하기!!!!!!!!!!!!
  const [isChecked, setIsChecked] = useState(true); // 체크하기=>초깃값 체크되어 있게 설정
  const [userAddr, setUserAddr] = useState({
    custKey: loginUser,
    name: "",
    tel: "",
    postcode: "",
    addr: "",
    addrDetail: "",
  });
  const [getAddr, setGetAddr] = useState([]);

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

  const defaultAddress = getAddr.find((address) => address.defaultAddr === "Y");

  useEffect(() => {
    console.log(isChecked, "isChecked 값");
    console.log(defaultAddress, "defaultAddress 값");
    // if (defaultAddress && isChecked) { // isChecked의 초깃값이 false이기 때문에 false가 아닌 경우(= ture)에 실행
    if (defaultAddress && isChecked==true) {
      const newUserAddr = { // 새로운 사용자 주소 정보 생성
        custKey: loginUser,
        name: defaultAddress.name,
        tel: defaultAddress.tel,
        postcode: defaultAddress.postcode,
        addr: defaultAddress.addr,
        addrDetail: defaultAddress.addrDetail,
      };
      setUserAddr(newUserAddr); // 새로운 사용자 주소 정보로 상태 업데이트
      console.log("체크박스 클릭후 디폴트 주소 저장됨:", isChecked);
      handleUserAddrChange(newUserAddr); // 새로운 사용자 주소 정보를 전달하여 처리
      // setUserAddr({
      //   custKey: loginUser,
      //   name: defaultAddress.name,
      //   tel: defaultAddress.tel,
      //   postcode: defaultAddress.postcode,
      //   addr: defaultAddress.addr,
      //   addrDetail: defaultAddress.addrDetail,
      // });
      // console.log("체크박스 클릭후 디폴트 주소 저장됨:", isChecked);
      // handleUserAddrChange(userAddr);
    } else if (isChecked==false) {
      const emptyUserAddr = { // 빈 사용자 주소 정보 생성
        custKey: loginUser,
        name: "",
        tel: "",
        postcode: "",
        addr: "",
        addrDetail: "",
      };
      setUserAddr(emptyUserAddr); // 빈 사용자 주소 정보로 상태 업데이트
      console.log("체크박스 해제후 주소 초기화:", isChecked);
      handleUserAddrChange(emptyUserAddr); // 빈 사용자 주소 정보를 전달하여 처리
      // setUserAddr({
      //   custKey: loginUser,
      //   name: "",
      //   tel: "",
      //   postcode: "",
      //   addr: "",
      //   addrDetail: "",
      // });
      // console.log("체크박스 해제후 주소 초기화:", isChecked);
      // handleUserAddrChange(userAddr);
    }
  }, [defaultAddress, isChecked]);

  const checked = () => {
    setIsChecked(!isChecked);
    // setIsChecked(prevChecked => !prevChecked); // 이전 isChecked 값의 반대값으로 설정
  };

  useEffect(() => {
    getCustomer();
  }, []);

  useEffect(() => {
    getCustomerAddr();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    // setUserAddr({ ...userAddr, [name]: value });
    // handleUserAddrChange(userAddr);
    setUserAddr((prevUserAddr) => ({
      ...prevUserAddr,
      [name]: value,
    }));
    handleUserAddrChange({ ...userAddr, [name]: value }); // 입력 값 즉시 반영
  };

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
