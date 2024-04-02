import React, { useEffect, useState, useContext } from "react";
import "../styled/Profile.css";
import "../styled/PurchaseHistory.css";
import Header from "../components/Header";
import MyPageSide from "../components/MypageSide";
import Footer from "../components/Footer";
import { LoginContext } from "../components/LoginContext";
import axios from "axios";
const Profile = () => {
  const { loginUser } = useContext(LoginContext); // isLoggedIn 값 가져오기
  // 로그인 및 로그아웃 이벤트 발생 시에도 세션 체크
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [userAddr, setUserAddr] = useState({
    custKey: loginUser,
    name: "",
    tel: "",
    postcode: "",
    addr: "",
    addrDetail: "",
  });
  const [getAddr, setGetAddr] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserAddr({ ...userAddr, [name]: value });
  };

  const getCustomer = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/customers/${loginUser}`
      );
      setUser(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const getCustomerAddr = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/address/${loginUser}`
      );
      // console.log(response.data);
      setGetAddr(response.data);
    } catch (error) {
      console.error("고객의 주소를 가져올수 없습니다.", error);
    }
  };

  const deleteAddr = async (e) => {
    // e.preventDefault();
    try {
      await axios.delete(`http://localhost:3001/address/${e}`);
      getCustomer();
    } catch (error) {
      console.error("주소를 삭제를 실패하였습니다.", error);
    }
  };

  useEffect(() => {
    getCustomer();
    // getCustomerAddr();
  }, []);
  useEffect(() => {
    getCustomerAddr();
  }, [user, userAddr]);

  const submitBtn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/address`,
        userAddr
      );
      if (response.status === 200) {
        setUserAddr((prevUserAddr) => ({
          ...prevUserAddr,
          name: "",
          tel: "",
          postcode: "",
          addr: "",
          addrDetail: "",
        }));
      }
      setModalOpen(false);
    } catch (error) {
      console.error("주소 보내기 에러남", error);
    }
  };

  return (
    <>
      <div className="height-container">
        <Header />

        <div className="yhw_container">
          <div className="yhw_purHistCont">
            <div className="yhw_MypageSideAdd">
              <MyPageSide />
            </div>
            <div className="yhw_purHistMainCont">
              <div className="lcm_purHistMainCont">
                <div className="lcm_purHistTopCont">
                  <b>로그인 정보</b>
                </div>
                <div className="lcm_purHistContentsBox">
                  <ul className="lcm_purHistLists">
                    <h4>아이디</h4>
                    <li>
                      <div>{user.userid}</div>
                    </li>
                  </ul>
                </div>

                <div className="lcm_purHistContentsBox">
                  <div className="lcm_purHistTopCont">
                    <b>개인 정보</b>
                  </div>
                  <ul className="lcm_purHistLists">
                    <h4>휴대폰 번호</h4>
                    <li>
                      <div>{user.contact}</div>
                      <div className="lcm_purHistBtns">
                        <button>변경</button>
                      </div>
                    </li>
                    <h4>배송지</h4>

                    <li>
                      {getAddr.length > 0 && (
                        <div className="lcm-addInfo-contarinter">
                          {getAddr.map((address, i) => (
                            <div key={i}>
                              {" "}
                              {/* Add a unique key for each div */}
                              <div>AddressKey: {address.addrKey}</div>
                              <div>이름: {address.name}</div>
                              <div>휴대폰 번호: {address.tel}</div>
                              <div>
                                {`주소: [${address.postcode}] ${address.addr} ${address.addrDetail}`}
                              </div>
                              <div className="lcm_purHistBtns">
                                <span>
                                  <button>수정</button>
                                  <button
                                    onClick={() => deleteAddr(address.addrKey)}
                                  >
                                    삭제
                                  </button>
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </li>

                    <li>
                      <div></div>
                      <div className="lcm_purHistBtns">
                        <button onClick={() => setModalOpen(true)}>
                          + 새 배송지 추가
                        </button>
                      </div>
                    </li>
                    <li style={{ borderBottom: "none" }}>
                      {modalOpen && (
                        <div className="lcm-addr-contrainer">
                          <form>
                            <div>
                              {/* <label htmlFor="content">받는사람:</label> */}
                              <input
                                type="text"
                                name="name"
                                placeholder="받는사람"
                                value={userAddr.name}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            </div>
                            <div>
                              {/* <label htmlFor="content">연락처:</label> */}
                              <input
                                type="text"
                                name="tel"
                                placeholder="연락처"
                                value={userAddr.tel}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            </div>
                            <div>
                              {/* <label htmlFor="content">우편번호:</label> */}
                              <input
                                type="text"
                                name="postcode"
                                placeholder="우편번호"
                                value={userAddr.postcode}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            </div>
                            <div>
                              {/* <label htmlFor="content">주소:</label> */}
                              <input
                                type="text"
                                name="addr"
                                placeholder="주소"
                                value={userAddr.addr}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            </div>
                            <div>
                              {/* <label htmlFor="content">상세주소:</label> */}
                              <input
                                type="text"
                                name="addrDetail"
                                placeholder="상세주소"
                                value={userAddr.addrDetail}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            </div>
                            <div className="lcm_purHistBtns">
                              {/* <button>+ 새 배송지 추가</button> */}
                              <span>
                                <button onClick={submitBtn}>저장</button>
                                <button onClick={() => setModalOpen(false)}>
                                  취소
                                </button>
                              </span>
                            </div>
                          </form>
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
