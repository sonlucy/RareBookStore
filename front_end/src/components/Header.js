import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../styled/Header.css";
import { FaSearch } from "react-icons/fa";
import useLogOut from "../hooks/api/useLogOut";
import { LoginContext } from "./LoginContext";
import axios from "axios";
/* import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType } from '@zxing/library'; */
import { FaBell } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { serverURL } from "../config";

const Header = () => {
  const { isLoggedIn, loginUser } = useContext(LoginContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // useNavigate 훅
  const location = useLocation();
  const { logout } = useLogOut(); // 로그아웃 훅 사용

  const [showNotification, setshowNotification] = useState(false);
  const [RegSellerNotification, setRegSellerNotification] = useState([]);
  const [purchaseNotification, setpurchaseNotification] = useState([]);
  const [showPurchaseNotification, setShowPurchaseNotification] = useState(false);
  const [showRegSellerNotification, setShowRegSellerNotification] = useState(false);
  const notifiRef = useRef(null);


  useEffect(() => {
  const fetchData = async () => {

    try {
      const response = await axios.get(`${serverURL}/customers/bells/${loginUser}`);
      setRegSellerNotification(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRegSellerNotification([]); // 에러 발생 시 빈 배열로 세팅
    }

    try {
      const response1 = await axios.get(`${serverURL}/orders/customer/sell/${loginUser}`);
      setpurchaseNotification(response1.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setpurchaseNotification([]); // 에러 발생 시 빈 배열로 세팅
    }
  };
  if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, loginUser]);



  const handleItemClick = (event) => {
    const items = document.querySelectorAll(".sbk-menu-item");
    items.forEach((item) => item.classList.remove("active"));
    event.target.classList.add("active");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim().length >= 2) {

      if (location.pathname.includes("/CategoryBookList/")) { // 특정 카테고리에 있을 경우
        //location.pathname에 serach가 포함될 경우 삭제
        let newURL = location.pathname.replace(/\/search.*/g, "");
        navigate(`${newURL}/search?q=${encodeURIComponent(searchTerm)}`);
      } else { //다른 모든 페이지의 경우, 검색 시 전체 카테고리에서 검색되도록
        navigate(`/CategoryBookList/all/search?q=${encodeURIComponent(searchTerm)}`);
      }

      window.location.reload();
    } else {
    alert("두 글자 이상 입력해주세요.");
    }
  };

  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      // 엔터 키를 눌렀을 때
      handleSearchSubmit(); // 검색 실행
    }
  };

  const handleLogout = () => {
    logout(); // 로그아웃 함수 호출
    window.location.reload(); // 페이지 리로드
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 말풍선 외의 영역을 클릭할 때 말풍선 닫기
      if (notifiRef.current && !notifiRef.current.contains(event.target)) {
        setshowNotification(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleBellClick = () => {
    setshowNotification(!showNotification);
    if (notifiRef.current) {
      const tooltipPosition = notifiRef.current.getBoundingClientRect();
      //console.log(tooltipPosition);
    }
  };


  return (
    <div>
      <div className="sbk-header-wrapper">
        <div className="sbk-li-container">
          <dl>
            <dt>
              <NavLink
                to="/QuestionForm"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                고객센터
              </NavLink>
            </dt>
            <dt>
              <NavLink
                to="/Mypage"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                마이페이지
              </NavLink>
            </dt>

            <dt>
              {isLoggedIn ? (
                <div
                  className="sbk-menu-item"
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  로그아웃
                </div>
              ) : (
                <NavLink
                  to="/SNSLogin"
                  className="sbk-menu-item"
                  activeClassName="active"
                  onClick={handleItemClick}
                >
                  로그인/회원가입
                </NavLink>
              )}
            </dt>
            {isLoggedIn && (
              <dt>
                <div className="sbk-menu-item sbk-notification-btn" title="알림 보기" onClick={handleBellClick}>
                  <FaBell />
                </div>
                {showNotification && (RegSellerNotification.length > 0 || purchaseNotification.length > 0) && (
                  <div className="sbk-notification-content" ref={notifiRef}>
                    {purchaseNotification.length > 0 && (
                      <ul>
                        <h4 className="sbk-notification-title" onClick={() => setShowPurchaseNotification(!showPurchaseNotification)}>
                          <p>🐥내 판매글 낙찰 소식</p>
                        </h4>
                        {showPurchaseNotification && purchaseNotification.map((item, index) => (
                          <li key={index}>
                            <NavLink to={`/Mypage/SalesHistory`} title="판매글 확인하기">
                            "{`${item.itemTitle}"에 대한 주문이 접수되었습니다.`}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                    <hr/>
                    {RegSellerNotification.length > 0 && (
                      <ul>
                        <h4 className="sbk-notification-title" onClick={() => setShowRegSellerNotification(!showRegSellerNotification)}>
                          <p>🐣내 도서에 대한 새로운 판매글</p>
                        </h4>
                        {showRegSellerNotification && RegSellerNotification.map((item, index) => (
                          <li key={index}>
                            <NavLink to={`/BuyDetail/${item.itemBuyKey}`} title="판매글 확인하기">
                              "{`${item.itemTitle}"에 대한 판매글이 등록되었습니다.`}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
                {showNotification && RegSellerNotification.length === 0 && purchaseNotification.length === 0 && (
                  <div className="sbk-notification-content" ref={notifiRef}>
                    <ul>
                      <li>내역이 존재하지 않습니다.</li>
                    </ul>
                  </div>
                )}
              </dt>
            )}

          </dl>
        </div>

        <div className="sbk-menu-container">
          <div className="sbk-logo-wrapper">
            <NavLink to="/" className="sbk-logo-link">
              <img
                className="sbk-logo-image"
                alt="로고이미지"
                src="/img/logo.png" // 이미지 파일의 절대 경로로 수정
              />
            </NavLink>
          </div>

          <div className="sbk-search-container">
            <FaSearch className="sbk-search-icon" />
            <input
              type="text"
              className="sbk-search-input"
              placeholder="  검색어를 입력하세요"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleEnterKeyDown}
            />
            <button className="sbk-search-button" onClick={handleSearchSubmit}>
              검색
            </button>
          </div>
        </div>

        <div className="sbk-nav-container">
          <dl>
            <dt>
              <NavLink
                to="/CategoryBookList/all"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                전체
              </NavLink>
            </dt>
            <dt>
              <NavLink
                // to="/economics"
                to="/CategoryBookList/economics"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                경제/경영
              </NavLink>
            </dt>
            <dt>
              <NavLink
                // to="/novels"
                to="/CategoryBookList/novels"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                소설/시/희곡
              </NavLink>
            </dt>
            <dt>
              <NavLink
                // to="/comics"
                to="/CategoryBookList/comics"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                만화
              </NavLink>
            </dt>
            <dt>
              <NavLink
                // to="/arts"
                to="/CategoryBookList/arts"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                예체능
              </NavLink>
            </dt>
            <dt>
              <NavLink
                // to="/science"
                to="/CategoryBookList/science"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                과학
              </NavLink>
            </dt>
            <dt>
              <NavLink
                // to="/essays"
                to="/CategoryBookList/essays"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                에세이
              </NavLink>
            </dt>
          </dl>
        </div>
      </div>
      <hr className="sbk-header-hr" />
    </div>
  );
};

export default Header;
